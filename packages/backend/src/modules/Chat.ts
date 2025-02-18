import { Module } from "@nestjs/common";
import { ChatController } from "@repo/backend/controllers/Chat.js";
import { ChatService } from "@repo/backend/services/Chat.js";
import { LangFlowService } from "../services/Flow.js";
import { GotenbergService } from "../services/Gotenberg.js";

@Module({
	imports: [],
	providers: [ChatService, LangFlowService, GotenbergService],
	exports: [ChatService],
	controllers: [ChatController],
})
export class ChatModule {}
