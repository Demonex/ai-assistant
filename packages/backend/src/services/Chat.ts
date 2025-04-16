import { EntityManager } from "@mikro-orm/core";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ChatMessageEntity } from "@repo/backend/entities/Chat/index.js";
import path from "node:path";
import type { ChatMessageDto, ChatUploadMediaDto } from "../dto/Chat.js";
import { CollectionEntity } from "../entities/Collection/index.js";
import { DocEntity } from "../entities/Doc/index.js";
import { GROUP_PERMISSION } from "../entities/Group/group-group-permissions.js";
import { PROVIDER_TYPE } from "../entities/Provider/index.js";
import { HttpStatusMessages } from "../messages/http.js";
import type { UploadedFile } from "../types/Chat.js";
import type { FlowResponse } from "../types/FLow.js";
import { getHandleUpload } from "../utils/handleUpload.js";
import { logErrors, promiseMap } from "../utils/index.js";
import { LangFlowService } from "./Flow.js";
import { GotenbergService } from "./Gotenberg.js";
import { GroupService } from "./Group.js";
import { UserService } from "./User.js";
import { AudioService } from "./Audio.js";

@Injectable()
export class ChatService {
	constructor(
		private readonly em: EntityManager,
		private readonly flowService: LangFlowService,
		private readonly userService: UserService,
		private readonly groupService: GroupService,
		private readonly gotenbergService: GotenbergService,
		private readonly audioSerivce: AudioService,
	) {}

	async validateAndGetCollection(
		userKey:
			| ChatMessageEntity["user"]["id"]
			| ChatMessageEntity["user"]["email"],
		chatId: ChatMessageEntity["id"],
	) {
		const collections = await this.chats(userKey);

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
		userKey:
			| ChatMessageEntity["user"]["id"]
			| ChatMessageEntity["user"]["email"],
		_currentTenant?: number,
	) {
		const user = await this.userService.findByIdOrEmail({ user: userKey });
		const groups = await this.groupService.findGroups(user);
		const permission = this.groupService.verifyPermissions(user, groups, [
			GROUP_PERMISSION.admin,
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
		userKey:
			| ChatMessageEntity["user"]["id"]
			| ChatMessageEntity["user"]["email"],
		chatId: ChatMessageEntity["id"],
		_currentTenant?: number,
	) {
		const collection = await this.validateAndGetCollection(userKey, chatId);

		const messages = await this.em.find<
			ChatMessageEntity,
			never,
			keyof ChatMessageEntity
		>(
			ChatMessageEntity,
			{
				user:
					typeof userKey === "number" ? { id: userKey } : { email: userKey },
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
		userKey:
			| ChatMessageEntity["user"]["id"]
			| ChatMessageEntity["user"]["email"],
		chatId: CollectionEntity["id"],
		chatMessageDto: ChatMessageDto,
		_currentTenant?: number,
	) {
		const collection = await this.validateAndGetCollection(userKey, chatId);

		const docs = await this.em.find<DocEntity>(DocEntity, {
			collection,
		});

		if (!docs.length) {
			console.error("Collection Empty");

			throw new HttpException("Collection Empty", HttpStatus.FORBIDDEN);
		}

		try {
			const chatMessage = this.em.create<ChatMessageEntity>(ChatMessageEntity, {
				user:
					typeof userKey === "number" ? { id: userKey } : { email: userKey },
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

	async initiateRetrieveFlow(
		userKey:
			| ChatMessageEntity["user"]["id"]
			| ChatMessageEntity["user"]["email"],
		chatId: CollectionEntity["id"],
		data: ChatMessageDto,
	) {
		const collection = await this.validateAndGetCollection(userKey, chatId);

		const { provider, settings } =
			await this.getMinioProviderAndSettings(chatId);

		const endpointExternal = process.env.S3_ENDPOINT_EXTERNAL;

		const bucket =
			(provider.settings?.bucket as string) ||
			(settings?.bucket as string) ||
			process.env.S3_BUCKET_DOC_MEDIA;

		const copyFlow = await this.flowService.getFlow({ action: "RETRIEVE" });
		const newFlow = await this.flowService.copyFlow(copyFlow);

		const newFlowId = newFlow.id;
		// const { id: qdrantId } = newFlow.data.nodes.find(
		// 	(node) => node.data.node.display_name === "Qdrant",
		// );

		const { id: qdrantId } = newFlow.data.nodes.find(
			(node) => node.data.node.display_name === "Qdrant",
		);
		const { id: ollamaId } = newFlow.data.nodes.find(
			(node) => node.data.node.display_name === "Ollama",
		);

		try {
			const response = await this.flowService.runFlow({
				flowId: newFlowId,
				payload: {
					message: data.raw,
					tweaks: {
						[qdrantId]: {
							collection_name: collection.title,
							url: process.env.VECTOR_STORE_URL,
						},
						[ollamaId]: {
							base_url: process.env.MODEL_URL,
							model_name: "qwen2.5:latest",
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
			logErrors(error);

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
			const chatMessage = await this.em.findOne<
				ChatMessageEntity,
				never,
				keyof ChatMessageEntity
			>(
				ChatMessageEntity,
				{
					id: messageId,
				},
				{
					fields: ["request", "response"],
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

	async uploadMedia(
		userKey:
			| ChatMessageEntity["user"]["id"]
			| ChatMessageEntity["user"]["email"],
		chatId: CollectionEntity["id"],
		data: ChatUploadMediaDto,
	) {
		const collection = await this.validateAndGetCollection(userKey, chatId);

		const { provider, settings } =
			await this.getMinioProviderAndSettings(chatId);

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

		const audioFormats = [
			"video/mp4",
			"video/webm",
			"audio/x-wav",
			"audio/mpeg",
			"audio/x-m4a",
		];

		const uploadData = await promiseMap<
			{
				file: string;
				status: "success" | "duplicates" | "errors";
				message?: string;
			},
			UploadedFile
		>(data.media, async (media) => {
			const fileKey = media.originalname;

			try {
				const docExists = await this.em.count<DocEntity>(DocEntity, {
					filename: `${collection.title}/${fileKey}`,
				});

				if (docExists) {
					return {
						file: fileKey,
						status: "duplicates",
						message: "File Already Exists",
					};
				}

				if (audioFormats.includes(media.mimetype)) {
					// TODO
					return await this.audioSerivce.convert(media);
				}

				const pdfMedia =
					fileKey.split(".").pop() !== "pdf"
						? await this.gotenbergService.convert(media)
						: media;

				const oldFLow = await this.flowService.getFlow({ action: "UPLOAD" });
				const newFlow = await this.flowService.copyFlow(oldFLow);
				const newFlowId = newFlow.id;

				const { file_path: filepath } = await this.flowService.uploadFile({
					flowId: newFlowId,
					filename: fileKey,
					media: pdfMedia,
				});

				const { id: fileId } = newFlow.data.nodes.find(
					(node) => node.data.node.display_name === "File",
				);
				const { id: qdrantId } = newFlow.data.nodes.find(
					(node) => node.data.node.display_name === "Qdrant",
				);
				const { id: ollamaId } = newFlow.data.nodes.find(
					(node) => node.data.node.display_name === "Ollama Embeddings",
				);

				if (!fileId || !qdrantId) {
					console.error("LangFlow Error: - Failed To Find Components");

					throw new HttpException(
						"Pipeline Components Not Found",
						HttpStatus.INTERNAL_SERVER_ERROR,
					);
				}

				await this.flowService.runFlow({
					action: "UPLOAD",
					flowId: newFlowId,
					payload: {
						tweaks: {
							[fileId]: {
								path: `${filepath}`,
							},
							[qdrantId]: {
								collection_name: collection.title.toString(),
								url: process.env.VECTOR_STORE_URL,
							},
							[ollamaId]: {
								base_url: process.env.EMBEDDING_URL,
								model_name: "bge-m3:latest",
							},
						},
					},
				});
				await this.flowService.deleteFlow(newFlow);

				if (media !== pdfMedia) {
					upload({ file: media });
				}
				upload({ file: pdfMedia });

				const vectorFilePath = `/app/langflow/${filepath}`;

				const doc = this.em.create<DocEntity>(DocEntity, {
					filename: `${collection.title}/${fileKey}`,
					filesize: media.size,
					mimeType: media.mimetype,
					collection: chatId,
					provider: provider.id,
					vectorFilePath,
				});
				await this.em.persistAndFlush(doc);

				return {
					file: fileKey,
					status: "success",
				};
			} catch (error) {
				logErrors(error);

				return {
					file: fileKey,
					status: "errors",
					message: error.message,
				};
			}
		});

		const uploadResult = {
			success: uploadData
				.filter((upload) => upload.status === "success")
				.map((elem) => {
					delete elem.status;
					return elem;
				}),
			duplicates: uploadData
				.filter((upload) => upload.status === "duplicates")
				.map((elem) => {
					delete elem.status;
					return elem;
				}),
			errors: uploadData
				.filter((upload) => upload.status === "errors")
				.map((elem) => {
					delete elem.status;
					return elem;
				}),
		};

		return uploadResult;
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

	async getMinioProviderAndSettings(chatId: CollectionEntity["id"]) {
		const collection = await this.em.findOne<
			CollectionEntity,
			keyof CollectionEntity | "providers.provider",
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
				populate: ["providers", "providers.provider"],
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

		return { provider, settings };
	}
}
