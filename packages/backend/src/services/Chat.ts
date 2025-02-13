import { EntityManager } from "@mikro-orm/core";
import { InjectRedis } from "@nestjs-modules/ioredis";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ChatMessageEntity } from "@repo/backend/entities/Chat/index.js";
import type { Redis } from "ioredis";
import type { ChatMessageDto } from "../dto/Chat.js";
import { CollectionEntity } from "../entities/Collection/index.js";
import { GROUP_PERMISSION } from "../entities/Group/group-group-permissions.js";
import { GroupEntity } from "../entities/Group/index.js";
import { PROVIDER_TYPE } from "../entities/Provider/index.js";
import { UserEntity } from "../entities/User/index.js";
import { getHandleUpload } from "../utils/handleUpload.js";
import { promiseMap } from "../utils/index.js";
import { LangFlowService } from "./Flow.js";
import { DocEntity } from "../entities/Doc/index.js";
import { GotenbergService } from "./Gotenberg.js";

type HintType = "users" | "groupPermissions" | "groupCollectionPermissions";

@Injectable()
export class ChatService {
	constructor(
		@InjectRedis() private readonly redisClient: Redis,
		private readonly em: EntityManager,
		private readonly flowService: LangFlowService,
		private readonly gotenbergService: GotenbergService,
	) {}

	async chats(userId: ChatMessageEntity["user"]["id"], currentTenant) {
		const user = await this.em.findOneOrFail<UserEntity, HintType>(UserEntity, {
			id: userId,
		});

		const groups = await this.em.find<GroupEntity, HintType>(
			GroupEntity,
			{
				users: {
					user: userId,
				},
			},
			{
				populate: ["users", "groupPermissions", "groupCollectionPermissions"],
				populateWhere: "infer",
			},
		);

		const isAdminOrCollectionPermission =
			user?.superadmin ||
			groups.some((group) => {
				console.log(group);

				return group.groupPermissions
					.map(
						(entity) =>
							entity.permission === GROUP_PERMISSION.admin ||
							entity.permission === GROUP_PERMISSION.collection,
					)
					.some((el) => !!el);
			});

		if (isAdminOrCollectionPermission) {
			return await this.em.find<CollectionEntity>(CollectionEntity, {
				tenant: currentTenant,
			});
		}

		const collectionKeys = groups.flatMap((group) => {
			return group.groupCollectionPermissions.map((perm) => perm.collection.id);
		});

		return await this.em.find<CollectionEntity>(
			CollectionEntity,
			{
				id: {
					$in: collectionKeys,
				},
				tenant: currentTenant,
			},
			{
				exclude: ["tenant"],
			},
		);
	}

	async chat(
		userId: ChatMessageEntity["user"]["id"],
		chatId: ChatMessageEntity["id"],
	) {
		const messages = await this.em.find<ChatMessageEntity>(ChatMessageEntity, {
			user: userId,
			collection: chatId,
		});
		return messages;
	}

	async messageCreate(
		userId: ChatMessageEntity["user"]["id"],
		chatId: CollectionEntity["id"],
		chatMessageDto: ChatMessageDto,
	) {
		const user = await this.em.findOneOrFail<UserEntity, HintType>(UserEntity, {
			id: userId,
		});

		const groups = await this.em.find<GroupEntity, HintType>(
			GroupEntity,
			{
				users: {
					user: userId,
				},
			},
			{
				populate: ["users", "groupPermissions", "groupCollectionPermissions"],
				populateWhere: "infer",
			},
		);

		const isAdminOrCollectionPermission =
			user?.superadmin ||
			groups.some((group) => {
				return group.groupPermissions
					.map(
						(entity) =>
							entity.permission === GROUP_PERMISSION.admin ||
							entity.permission === GROUP_PERMISSION.collection,
					)
					.some((el) => !!el);
			});

		if (!isAdminOrCollectionPermission) {
			const collectionKeys = groups.flatMap((group) => {
				return group.groupCollectionPermissions.map(
					(perm) => perm.collection.id,
				);
			});

			if (!collectionKeys.includes(chatId)) {
				console.error("Error creating chatMessage: 404");

				throw new HttpException(
					"Internal Server Error",
					HttpStatus.INTERNAL_SERVER_ERROR,
				);
			}
		}

		try {
			const chatMessage = this.em.create<ChatMessageEntity>(ChatMessageEntity, {
				user: userId,
				collection: chatId,
				message: {
					raw: chatMessageDto.raw,
				},
				response: chatMessageDto.response,
				created_at: chatMessageDto.created_at || new Date(),
			});
			await this.em.persistAndFlush(chatMessage);

			return chatMessage;
		} catch (error) {
			console.error("Error creating chatMessage:", error);

			throw new HttpException(
				"Internal Server Error",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async messagePatch(
		messageId: ChatMessageEntity["id"],
		chatMessageDto: Partial<ChatMessageDto>,
	) {
		try {
			const chatMessage = await this.em.findOne<ChatMessageEntity>(
				ChatMessageEntity,
				{
					id: messageId,
				},
			);

			chatMessage.response = chatMessageDto.response;
			await this.em.flush();

			return chatMessage;
		} catch (error) {
			console.error("Error creating chatMessage:", error);

			throw new HttpException(
				"Internal Server Error",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async uploadMedia(userId, chatId, data) {
		const user = await this.em.findOneOrFail<UserEntity, HintType>(UserEntity, {
			id: userId,
		});

		const groups = await this.em.find<GroupEntity, HintType>(
			GroupEntity,
			{
				users: {
					user: userId,
				},
			},
			{
				populate: ["users", "groupPermissions", "groupCollectionPermissions"],
				populateWhere: "infer",
			},
		);

		const isAdminOrCollectionPermission =
			user?.superadmin ||
			groups.some((group) => {
				return group.groupPermissions
					.map(
						(entity) =>
							entity.permission === GROUP_PERMISSION.admin ||
							entity.permission === GROUP_PERMISSION.collection,
					)
					.some((el) => !!el);
			});

		if (!isAdminOrCollectionPermission) {
			const collectionKeys = groups.flatMap((group) => {
				return group.groupCollectionPermissions.map(
					(perm) => perm.collection.id,
				);
			});

			if (!collectionKeys.includes(chatId)) {
				console.error("Error uploading media: 404");

				throw new HttpException(
					"Internal Server Error",
					HttpStatus.INTERNAL_SERVER_ERROR,
				);
			}
		}

		const collection = await this.em.findOne<
			CollectionEntity,
			"providers" | "providers.provider"
		>(
			CollectionEntity,
			{
				id: chatId,
				providers: {
					enabled: true,
					provider: {
						type: PROVIDER_TYPE.minio,
					},
				},
			},
			{
				populate: ["providers", "providers.provider"],
				populateWhere: "infer",
			},
		);

		if (!collection) {
			throw new HttpException(
				"Collection with active minio provider not found",
				HttpStatus.BAD_REQUEST,
			);
		}

		const [{ provider, settings } = {}] = collection.providers;

		if (!provider) {
			throw new HttpException("Provider not found", HttpStatus.BAD_REQUEST);
		}

		console.log(data.media);

		const upload = getHandleUpload({
			bucket:
				(settings?.bucket as string) || (provider.settings?.bucket as string),
			acl: "public-read",
			getStorageClient: () => ({
				credentials: {
					accessKeyId: provider.settings?.login as string,
					secretAccessKey: provider.settings?.password as string,
				},
				region: process.env.S3_REGION,
				endpoint: provider.settings?.endpoint as string,
				forcePathStyle: true,
			}),
		});

		await promiseMap(data.media, async (media) => {
			const fileKey = await upload({ file: media });

			const bucket =
				(provider.settings?.bucket as string) || (settings?.bucket as string);
			const login =
				(provider.settings?.login as string) || (settings?.login as string);
			const password =
				(provider.settings?.password as string) ||
				(settings?.password as string);
			const endpoint =
				(provider.settings?.endpoint as string) ||
				(settings?.endpoint as string);
			const dockerEndpoint =
				(provider.settings?.dockerEndpoint as string) ||
				(settings?.dockerEndpoint as string);

			const mediaPDF = await this.gotenbergService.convertFromS3({
				fileKeys: [fileKey],
				params: {
					bucket,
					acl: "public-read",
					dockerEndpoint,
					getStorageClient: () => ({
						credentials: {
							accessKeyId: login,
							secretAccessKey: password,
						},
						region: process.env.S3_REGION,
						forcePathStyle: true,
						endpoint,
					}),
				},
			});

			const flowId = "e37720bf-bb8e-487d-9138-3bd1869c8330";

			const { file_path: filePath } = await this.flowService.uploadFile({
				flowId,
				media,
			});

			const vectorFilePath = `/app/data/.cache/langflow/${filePath}`;

			try {
				const doc = this.em.create<DocEntity>(DocEntity, {
					filename: media.originalname,
					filesize: media.size,
					mimeType: media.mimetype,
					collection: chatId,
					provider: provider.id,
					vectorFilePath,
				});
				await this.em.persistAndFlush(doc);
			} catch (error) {
				console.error("Error creating doc:", error);

				throw new HttpException(
					"Internal Server Error",
					HttpStatus.INTERNAL_SERVER_ERROR,
				);
			}

			await this.flowService.runFlow({
				flowId,
				payload: {
					tweaks: {
						"File-Asmj7": {
							path: `${filePath}`,
							concurrency_multithreading: 4,
							silent_errors: false,
							use_multithreading: false,
						},
					},
				},
			});
		});

		return collection;
	}
}
