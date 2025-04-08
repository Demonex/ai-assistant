import {
	Body,
	Controller,
	Get,
	HttpCode,
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
import { Authorized } from "@repo/backend/decorators/auth.js";
import { TenantId, UserId } from "@repo/backend/decorators/user.js";
import { ChatService } from "@repo/backend/services/Chat.js";
import { ChatMessageDto, ChatUploadMediaDto } from "../dto/Chat.js";

// type Fragment = {
// 	file_path: string;
// 	page_num: number;
// 	text: string;
// 	uuid: string;
// 	_collection_name: string;
// 	_id: string;
// };

// type MessageResponse = {
// 	success: boolean;
// 	message: string;
// 	created_at: Date;
// 	fragments: Fragment[];
// };

// type PatchPayload = {
// 	response: MessageResponse;
// };

@ApiTags("chat")
@Controller("/api/rest")
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

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
	async getChat(
		@UserId() userId: number,
		@Param("id") chatId: number,
		@TenantId() currentTenant: number,
	) {
		return this.chatService.chat(userId, chatId, currentTenant);
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

		const rawResponse = await this.chatService.initiateRetrieveFlow(
			userId,
			chatId,
			data,
		);
		const response = this.chatService.optimiseResponse(rawResponse);

		return await this.chatService.messagePatch(messageId, response);
	}

	@Post("/chat/:id/message-external")
	@HttpCode(200)
	async sendMessageExternal(
		@Param("id") chatId: number,
		@Body() data: ChatMessageDto,
	) {
		const { id: messageId } = await this.chatService.messageCreate(
			2,
			chatId,
			data,
		);

		const rawResponse = await this.chatService.initiateRetrieveFlow(
			2,
			chatId,
			data,
		);
		const response = this.chatService.optimiseResponse(rawResponse);

		return await this.chatService.messagePatch(messageId, response);
	}

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
