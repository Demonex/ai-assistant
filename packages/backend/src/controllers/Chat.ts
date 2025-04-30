import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UploadedFiles,
	UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";
import {
	ApiKey,
	Authorized,
	UserEmailKey,
} from "@repo/backend/decorators/auth.js";
import {
	ExternalEmail,
	TenantId,
	UserId,
} from "@repo/backend/decorators/user.js";
import { ChatService } from "@repo/backend/services/Chat.js";
import { ChatMessageDto } from "../dto/Chat.js";
import { ChatUploadMediaDto } from "../dto/Chat.js";

@ApiTags("chat")
@Controller("/api/v1")
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

	@UserEmailKey()
	@ApiKey()
	@Post("/completions")
	@HttpCode(200)
	async sendMessageExternal(
		@ExternalEmail() userEmail: string,
		@Body() data: ChatMessageDto,
	) {
		const chats = await this.chatService.chats(userEmail);

		if (!chats.length) {
			throw new HttpException("Collection Not Found", HttpStatus.NOT_FOUND);
		}

		const [{ id: chatId }] = chats;

		const { id: messageId } = await this.chatService.messageCreate(
			userEmail,
			chatId,
			data,
		);

		const rawResponse = await this.chatService.initiateRetrieveFlow(
			userEmail,
			chatId,
			data,
		);
		const response = this.chatService.optimiseResponse(rawResponse);

		return await this.chatService.messagePatch(messageId, response);
	}

	@Authorized()
	@Post("/chat/:id/upload")
	@ApiConsumes("multipart/form-data")
	@ApiBody({ type: ChatUploadMediaDto })
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
