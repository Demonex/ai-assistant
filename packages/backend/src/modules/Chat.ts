import { Module } from "@nestjs/common";
import { ChatController } from "@repo/backend/controllers/Chat.js";
import { ChatService } from "@repo/backend/services/Chat.js";
import { LangFlowService } from "../services/Flow.js";

@Module({
	imports: [],
	providers: [ChatService],
	exports: [ChatService, LangFlowService],
	controllers: [ChatController],
})
export class ChatModule {}
