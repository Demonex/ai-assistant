import { EntityManager } from "@mikro-orm/core";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ChatMessageEntity } from "@repo/backend/entities/Chat/index.js";
import path from "node:path";
import type { ChatMessageDto } from "../dto/Chat.js";
import { CollectionEntity } from "../entities/Collection/index.js";
import { DocEntity } from "../entities/Doc/index.js";
import { GROUP_PERMISSION } from "../entities/Group/group-group-permissions.js";
import { GroupEntity } from "../entities/Group/index.js";
import { PROVIDER_TYPE } from "../entities/Provider/index.js";
import { UserEntity } from "../entities/User/index.js";
import { HttpStatusMessages } from "../messages/http.js";
import type { FlowResponse } from "../types/FLow.js";
import { getHandleUpload } from "../utils/handleUpload.js";
import { promiseMap } from "../utils/index.js";
import { LangFlowService } from "./Flow.js";
import { GotenbergService } from "./Gotenberg.js";
import { GroupService } from "./Group.js";
import { UserService } from "./User.js";

@Injectable()
export class ChatService {
	constructor(
		private readonly em: EntityManager,
		private readonly flowService: LangFlowService,
		private readonly userService: UserService,
		private readonly groupService: GroupService,
		private readonly gotenbergService: GotenbergService,
	) {}

	async validateAndGetCollection(
		userId: ChatMessageEntity["user"]["id"],
		chatId: ChatMessageEntity["id"],
	) {
		const collections = await this.chats(userId);

		const collection = collections.find(
			(collection) => collection.id === chatId,
		);

		if (!collection) {
			console.error("Error retrieving collection: 404");

			throw new HttpException(
				"Collection " + HttpStatusMessages.NOT_FOUND,
				HttpStatus.NOT_FOUND,
			);
		}

		return collection;
	}

	async chats(
		userId: ChatMessageEntity["user"]["id"],
		_currentTenant?: number,
	) {
		const user = await this.userService.findByIdOrEmail({ id: userId });
		const groups = await this.groupService.findGroups(user);
		const permission = this.groupService.verifyPermissions(user, groups, [
			GROUP_PERMISSION.collection,
		]);

		if (Array.isArray(permission)) {
			return await this.em.find<
				CollectionEntity,
				never,
				keyof CollectionEntity
			>(
				CollectionEntity,
				{
					id: {
						$in: permission,
					},
					// tenant: currentTenant,
				},
				{
					fields: ["title", "description"],
				},
			);
		}

		if (permission) {
			return await this.em.find<
				CollectionEntity,
				never,
				keyof CollectionEntity
			>(
				CollectionEntity,
				{
					// tenant: currentTenant,
				},
				{
					fields: ["title", "description"],
				},
			);
		}

		return [];
	}

	async chat(
		userId: ChatMessageEntity["user"]["id"],
		chatId: ChatMessageEntity["id"],
		_currentTenant?: number,
	) {
		const collection = await this.validateAndGetCollection(userId, chatId);

		const messages = await this.em.find<
			ChatMessageEntity,
			never,
			keyof ChatMessageEntity
		>(
			ChatMessageEntity,
			{
				user: userId,
				collection,
			},
			{
				fields: ["id", "request", "response"],
				orderBy: { id: "asc" },
			},
		);

		const docsNumber = await this.em.count<DocEntity>(DocEntity, {
			collection,
		});

		return {
			description: collection.description,
			isEmpty: !docsNumber,
			messages,
		};
	}

	async messageCreate(
		userId: ChatMessageEntity["user"]["id"],
		chatId: CollectionEntity["id"],
		chatMessageDto: ChatMessageDto,
		_currentTenant?: number,
	) {
		// const user = await this.em.findOneOrFail<UserEntity, HintType>(UserEntity, {
		// 	id: userId,
		// });

		// const groups = await this.em.find<GroupEntity, HintType>(
		// 	GroupEntity,
		// 	{
		// 		users: {
		// 			user: userId,
		// 		},
		// 	},
		// 	{
		// 		populate: ["users", "groupPermissions", "groupCollectionPermissions"],
		// 		populateWhere: "infer",
		// 	},
		// );

		// const hasCollectionPermission =
		// 	user?.superadmin ||
		// 	groups.some((group) => {
		// 		return group.groupPermissions
		// 			.map(
		// 				(entity) =>
		// 					entity.permission === GROUP_PERMISSION.admin ||
		// 					entity.permission === GROUP_PERMISSION.collection,
		// 			)
		// 			.some((el) => !!el);
		// 	});

		// if (!hasCollectionPermission) {
		// 	const collectionKeys = groups.flatMap((group) => {
		// 		return group.groupCollectionPermissions.map(
		// 			(perm) => perm.collection.id,
		// 		);
		// 	});

		const collection = await this.validateAndGetCollection(userId, chatId);

		const docs = await this.em.find<DocEntity>(DocEntity, {
			collection,
		});

		if (!docs.length) {
			console.error("Collection Empty");

			throw new HttpException("Collection Empty", HttpStatus.FORBIDDEN);
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
				"Postgres Error: - Failed To Create Message",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async initiateFlow(chatId: CollectionEntity["id"], data: ChatMessageDto) {
		const collection = await this.em.findOne<
			CollectionEntity,
			keyof CollectionEntity,
			keyof CollectionEntity
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
				populate: ["providers", "providers."],
				populateWhere: "infer",
			},
		);

		if (!collection) {
			console.error("Collection With Active Minio Provider Not Found");

			throw new HttpException(
				"Collection With Active Minio Provider Not Found",
				HttpStatus.BAD_REQUEST,
			);
		}

		const { provider, settings } = collection.providers?.find(
			(provider) => provider.provider.type === PROVIDER_TYPE.minio,
		);

		if (!provider) {
			console.error("Provider Not Found");

			throw new HttpException("Provider not found", HttpStatus.BAD_REQUEST);
		}

		const endpointExternal = process.env.S3_ENDPOINT_EXTERNAL;

		const bucket =
			(provider.settings?.bucket as string) ||
			(settings?.bucket as string) ||
			process.env.S3_BUCKET_DOC_MEDIA;

		const copyFlow = await this.flowService.getFlow({ action: "RETRIEVE" });
		const newFlow = await this.flowService.copyFlow(copyFlow);

		const newFlowId = newFlow.id;
		const { id: qdrantId } = newFlow.data.nodes.find(
			(node) => node.data.node.display_name === "Qdrant",
		);

		try {
			const response = await this.flowService.runFlow({
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

			return response;
		} catch (error) {
			console.error("Request failed:", error.message);
			console.error("Status code:", error.response?.statusCode);
			console.error("Response body:", error.response?.body);
			console.error("Headers:", error.response?.headers);

			throw new HttpException(
				"Retrieve Pipeline Failed",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async messagePatch(
		messageId: ChatMessageEntity["id"],
		response: FlowResponse,
	) {
		try {
			const chatMessage = await this.em.findOne<ChatMessageEntity>(
				ChatMessageEntity,
				{
					id: messageId,
				},
			);

			chatMessage.response = response;
			await this.em.flush();

			return chatMessage;
		} catch (error) {
			console.error("Error patching chatMessage:", error);

			throw new HttpException(
				"Postgres Error: - Failed To Patch Message",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async uploadMedia(userId, chatId, data) {
		const user = await this.em.findOneOrFail<UserEntity>(UserEntity, {
			id: userId,
		});

		const groups = await this.em.find<GroupEntity, keyof GroupEntity>(
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

		const hasCollectionPermission =
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

		if (!hasCollectionPermission) {
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
			const newFlow = await this.flowService.copyFlow(copyFlow);

			console.log("after create flows", newFlow);

			const newFlowId = newFlow.id;
			// const fileId = newFlow.data.nodes.find(node => node.data.type === 'File').id;
			// const qdrantId = newFlow.data.nodes.find(node => node.data.type === 'CustomComponent').id;
			// const flowId = "e37720bf-bb8e-487d-9138-3bd1869c8330";

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

				const fileId = newFlow.data.nodes.find(
					(node) => node.data.node.display_name === "File",
				).id;
				const qdrantId = newFlow.data.nodes.find(
					(node) => node.data.node.display_name === "Qdrant",
				).id;

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

			await this.flowService.deleteFlow(newFlow);
		});

		return { success: true };
	}

	optimiseResponse(response: FlowResponse): FlowResponse {
		const clearText = (str: string) => str.replace(/\u0000/g, "");

		return {
			...response,
			message: clearText(response.message),
			fragments: response.fragments.map((frag) => ({
				...frag,
				text: clearText(frag.text),
			})),
		};
	}
}
