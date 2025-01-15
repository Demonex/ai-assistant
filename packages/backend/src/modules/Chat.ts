import { Module } from "@nestjs/common";
import { ChatController } from "@repo/backend/controllers/Chat.js";
import { ChatService } from "@repo/backend/services/Chat.js";

@Module({
	imports: [],
	providers: [ChatService],
	exports: [ChatService],
	controllers: [ChatController],
})
export class ChatModule {}
