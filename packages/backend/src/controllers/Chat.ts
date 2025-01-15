import {
	Body,
	Controller,
	Get,
	HttpCode,
	NotAcceptableException,
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
import { Authorized } from "@repo/backend/decorators/auth.js";
import { UserId } from "@repo/backend/decorators/user.js";
import { ChatService } from "@repo/backend/services/Chat.js";
import { ChatMessageDto, ChatUploadMediaDto } from "../dto/Chat.js";
import { HttpStatusMessages } from "../messages/http.js";

@ApiTags("chat")
@Controller("/api/rest")
export class ChatController {
	constructor(public service: ChatService) {}

	@ApiBearerAuth("bearer-sid")
	@ApiOperation({ summary: "get chats" })
	@Authorized()
	@Get("/chats")
	@HttpCode(200)
	async getChats(@UserId() userId: number) {
		return this.service.chats(userId);
	}

	@Authorized()
	@Get("/chat/:id")
	@HttpCode(200)
	async getChat(@UserId() userId: number, @Param("id") chatId: number) {
		return this.service.chat(userId, chatId);
	}

	@Authorized()
	@Post("/chat/:id/message")
	@HttpCode(200)
	@ApiBody({ type: () => ChatMessageDto })
	async sendMessage(
		@UserId() userId: number,
		@Param("id") chatId: number,
		@Body() data: ChatMessageDto,
	) {
		const result = await this.service.messageCreate(userId, chatId, data);
		return {
			success: result,
		};
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
	// 	return this.service.findByIdAndUpdateAvatar(id, { file });
	// }

	@Authorized()
	@Post("/chat/:id/upload")
	@ApiConsumes("multipart/form-data")
	// @ApiParam({name: 'id', type: Number})
	@UseInterceptors(
		FilesInterceptor("media", 500, {
			fileFilter: (_, file, callback) => {
				if (!file.mimetype.match(/(^image|video|text)(\/)[a-zA-Z0-9_]*/)) {
					return callback(
						new NotAcceptableException(HttpStatusMessages.FILE_NOT_ALLOWED),
						false,
					);
				}
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
		return this.service.uploadMedia(id, chatId, data);
	}
}
