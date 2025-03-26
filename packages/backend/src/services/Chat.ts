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
import path from "node:path";

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
				exclude: ["tenant", "providers", "groups"],
			},
		);
	}

	async chat(
		userId: ChatMessageEntity["user"]["id"],
		chatId: ChatMessageEntity["id"],
	) {
		const messages = await this.em.find<ChatMessageEntity>(
			ChatMessageEntity,
			{
				user: userId,
				collection: chatId,
			},
			{
				exclude: ["user", "collection"],
			},
		);
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
				request: {
					message: chatMessageDto.raw,
					created_at: new Date(),
				},
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

	async messageSend(
		userId: ChatMessageEntity["user"]["id"],
		chatId: CollectionEntity["id"],
		data: ChatMessageDto,
	) {
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

		const endpointExternal =
			process.env.S3_ENDPOINT_EXTERNAL ||
			(provider.settings?.dockerEndpoint as string) ||
			(settings?.dockerEndpoint as string);

		const bucket =
			(provider.settings?.bucket as string) ||
			(settings?.bucket as string) ||
			process.env.S3_BUCKET_DOC_MEDIA;

		// try {
		const copyFlow = await this.flowService.getFlow({ filter: "RETRIEVE" });
		const newFlow = await this.flowService.createFlow({ flow: copyFlow });

		const newFlowId = newFlow.id;
		const qdrantId = newFlow.data.nodes.find(
			(node) => node.data.node.display_name === "Qdrant",
		).id;

		try {
			// await this.flowService.deleteFlow({ flow: newFlow });
			const response = await this.flowService.runFlow({
				// flowId: "ec5c0e73-e348-4f1a-bc89-c0ed21167097",
				flowId: newFlowId,
				payload: {
					message: data.raw,
					tweaks: {
						[qdrantId]: {
							collection_name: collection.title,
						},
					},
				},
			});
			response.fragments.map((frag) => {
				const file_path = frag.file_path;
				const filenameWithDate = path.basename(file_path);
				const filename = filenameWithDate.replace(
					/^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}_/,
					"",
				);
				const fileLink = `${endpointExternal}/${bucket}/${filename}`;
				frag.file_path = fileLink;

				return frag;
			});

			return {
				success: true,
				response,
			};
		} catch (error) {
			console.error("Request failed:", error.message);
			console.error("Status code:", error.response?.statusCode);
			console.error("Response body:", error.response?.body);
			console.error("Headers:", error.response?.headers);
		}
	}

	async messagePatch(
		messageId: ChatMessageEntity["id"],
		data: Partial<ChatMessageEntity>,
	) {
		try {
			const chatMessage = await this.em.findOne<ChatMessageEntity>(
				ChatMessageEntity,
				{
					id: messageId,
				},
			);

			chatMessage.response = data.response;
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

		const login =
			process.env.S3_ACCESS_KEY_ID ||
			(provider.settings?.login as string) ||
			(settings?.login as string);

		const password =
			process.env.S3_SECRET_ACCESS_KEY ||
			(provider.settings?.password as string) ||
			(settings?.password as string);

		const endpoint =
			process.env.S3_ENDPOINT ||
			(provider.settings?.endpoint as string) ||
			(settings?.endpoint as string);

		const bucket =
			(provider.settings?.bucket as string) ||
			(settings?.bucket as string) ||
			process.env.S3_BUCKET_DOC_MEDIA;

		console.log("credentials ", {
			credentials: {
				accessKeyId: login,
				secretAccessKey: password,
			},
			region: process.env.S3_REGION,
			endpoint,
			forcePathStyle: true,
		});

		const upload = getHandleUpload({
			bucket,
			acl: "public-read",
			getStorageClient: () => ({
				credentials: {
					accessKeyId: login,
					secretAccessKey: password,
				},
				region: process.env.S3_REGION,
				endpoint,
				forcePathStyle: true,
			}),
		});

		await promiseMap(data.media, async (media) => {
			const fileKey = await upload({ file: media });

			console.log("after upload", fileKey);

			const copyFlow = await this.flowService.getFlow({ filter: "UPLOAD" });
			const newFlow = await this.flowService.createFlow({ flow: copyFlow });

			console.log("after create flows", newFlow);

			const newFlowId = newFlow.id;
			// const fileId = newFlow.data.nodes.find(node => node.data.type === 'File').id;
			// const qdrantId = newFlow.data.nodes.find(node => node.data.type === 'CustomComponent').id;
			// const flowId = "e37720bf-bb8e-487d-9138-3bd1869c8330";

			const fileId = newFlow.data.nodes.find(
				(node) => node.data.node.display_name === "File",
			).id;
			const qdrantId = newFlow.data.nodes.find(
				(node) => node.data.node.display_name === "Qdrant",
			).id;

			console.log(media);

			try {
				let resultUpload: { file_path: string } | null = null;

				if (media.originalname.split(".").pop() === "pdf") {
					resultUpload = await this.flowService.uploadFile({
						flowId: newFlowId,
						media,
						name: fileKey,
					});
				} else {
					resultUpload = await this.gotenbergService.convertFromS3({
						flowId: newFlowId,
						fileKey,
						params: {
							bucket,
							acl: "public-read",
							endpoint,
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

					console.log("after gotenb", resultUpload);
				}

				const { file_path: filepath } = resultUpload;

				// const { file_path: filePath } = await this.flowService.uploadFile({
				// 	flowId: newFlowId,
				// 	media,
				// });

				console.log(
					JSON.stringify({
						method: "UPLOAD",
						flowId: newFlowId,
						payload: {
							tweaks: {
								[fileId]: {
									path: `${filepath}`,
									concurrency_multithreading: 4,
									silent_errors: false,
									use_multithreading: false,
								},
								[qdrantId]: {
									collection_name: collection.title.toString(),
								},
							},
						},
					}),
				);

				await this.flowService.runFlow({
					method: "UPLOAD",
					flowId: newFlowId,
					payload: {
						tweaks: {
							[fileId]: {
								path: `${filepath}`,
								concurrency_multithreading: 4,
								silent_errors: false,
								use_multithreading: false,
							},
							[qdrantId]: {
								collection_name: collection.title.toString(),
							},
						},
					},
				});

				console.log("after run flow");
				const vectorFilePath = `/app/langflow/${filepath}`;

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

					console.log("after create doc entity", doc);
				} catch (error) {
					console.error("Error creating doc:", error);

					throw new HttpException(
						"Internal Server Error",
						HttpStatus.INTERNAL_SERVER_ERROR,
					);
				}
			} catch (error) {
				console.error("Request failed:", error.message);
				console.error("Status code:", error.response?.statusCode);
				console.error("Response body:", error.response?.body);
				console.error("Headers:", error.response?.headers);
			}

			await this.flowService.deleteFlow({ flow: newFlow });
		});

		return { success: true };
	}
}
