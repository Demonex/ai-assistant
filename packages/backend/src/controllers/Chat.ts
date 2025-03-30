import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	NotAcceptableException,
	Param,
	Post,
	UploadedFiles,
	UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import {
	ApiBearerAuth,
	ApiConsumes,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";
import { ApiKey, Authorized } from "@repo/backend/decorators/auth.js";
import { TenantId, UserId } from "@repo/backend/decorators/user.js";
import { ChatService } from "@repo/backend/services/Chat.js";
import { ChatMessageDto, ChatUploadMediaDto } from "../dto/Chat.js";
import { HttpStatusMessages } from "../messages/http.js";
import { LangFlowService } from "../services/Flow.js";

interface Fragment {
	file_path: string;
	page_num: number;
	text: string;
	uuid: string;
	_collection_name: string;
	_id: string;
}

interface MessageResponse {
	success: boolean;
	message: string;
	created_at: Date;
	fragments: Fragment[];
}

interface PatchPayload {
	response: MessageResponse;
}

@ApiTags("chat")
@Controller("/api/rest")
export class ChatController {
	constructor(
		private readonly chatService: ChatService,
		private readonly flowService: LangFlowService,
	) {}

	@ApiBearerAuth("bearer-sid")
	@ApiOperation({ summary: "get chats" })
	@Authorized()
	@Get("/chats")
	@HttpCode(200)
	async getChats(@UserId() userId: number, @TenantId() currentTenant: number) {
		return this.chatService.chats(userId, currentTenant);
	}

	@Authorized()
	@Get("/chat/:id")
	@HttpCode(200)
	async getChat(@UserId() userId: number, @Param("id") chatId: number) {
		return this.chatService.chat(userId, chatId);
	}

	@Authorized()
	@Post("/chat/:id/message")
	@HttpCode(200)
	async sendMessage(
		@UserId() userId: number,
		@Param("id") chatId: number,
		@Body() data: ChatMessageDto,
	) {
		const { id: messageId } = await this.chatService.messageCreate(
			userId,
			chatId,
			data,
		);

		const response = await this.chatService.messageSend(userId, chatId, data);

		const cleanText = (str: string) => str.replace(/\u0000/g, "");

		try {
			await this.chatService.messagePatch(messageId, {
				response: {
					success: response.success,
					message: cleanText(response.response.message),
					created_at: response.response.created_at,
					fragments: response.response.fragments.map((el) => {
						return {
							file_path: el.file_path,
							page_num: el.page_num,
							text: cleanText(el.text),
							uuid: el.uuid,
							_collection_name: el._collection_name,
							_id: el._id,
						};
					}),
				} satisfies PatchPayload["response"],
			});
		} catch (e) {
			console.error(e);
		}

		response.response.id = messageId;

		return response;
	}

	@Post("/chat/:id/message-external")
	@HttpCode(200)
	async sendMessageCringe(
		@Param("id") chatId: number,
		@Body() data: ChatMessageDto,
	) {
		const { id: messageId } = await this.chatService.messageCreate(
			2,
			chatId,
			data,
		);

		const response = await this.chatService.messageSend(2, chatId, data);

		const cleanText = (str: string) => str.replace(/\u0000/g, "");

		await this.chatService.messagePatch(messageId, {
			response: {
				success: response.success,
				message: cleanText(response.response.message),
				created_at: response.response.created_at,
				fragments: response.response.fragments.map((el) => {
					return {
						file_path: el.file_path,
						page_num: el.page_num,
						text: cleanText(el.text),
						uuid: el.uuid,
						_collection_name: el._collection_name,
						_id: el._id,
					};
				}),
			} satisfies PatchPayload["response"],
		});

		return response;
	}
	// @ApiOperation({ summary: "avatar update in profile" })
	// @UseInterceptors(
	// 	FileInterceptor(
	// 		"file" /*{
	// 			limits: {
	// 				fieldNameSize: 100,
	// 				fieldSize: 1000000,
	// 				fields: 20,
	// 				fileSize: 5000000,
	// 				files: 1,
	// 				headerPairs: 2000
	// 			}
	// 			}*/,
	// 	),
	// )
	// @ApiConsumes("multipart/form-data")
	// async updateAvatar(@UserId() id: Types.ObjectId, @UploadedFile("file") file) {
	// 	// console.log('avatar update', get(request, 'headers.authorization'), get(request, 'session.id'), id);
	// 	return this.chatService.findByIdAndUpdateAvatar(id, { file });
	// }

	@Authorized()
	@Post("/chat/:id/upload")
	@ApiConsumes("multipart/form-data")
	@UseInterceptors(
		FilesInterceptor("media", 500, {
			fileFilter: (_, file, callback) => {
				// if (!file.mimetype.match(/(^image|video|text)(\/)[a-zA-Z0-9_]*/)) {
				// 	return callback(
				// 		new NotAcceptableException(HttpStatusMessages.FILE_NOT_ALLOWED),
				// 		false,
				// 	);
				// }
				file.originalname = Buffer.from(file.originalname, "latin1").toString(
					"utf8",
				);
				return callback(null, true);
			},
		}),
	)
	async uploadFiles(
		@UserId() id: number,
		@Param("id") chatId: number,
		@Body() data: ChatUploadMediaDto,
		@UploadedFiles() media: ChatUploadMediaDto["media"],
	) {
		data.media = media;
		return this.chatService.uploadMedia(id, chatId, data);
	}
}
