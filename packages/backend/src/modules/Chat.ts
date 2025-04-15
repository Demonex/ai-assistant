import { Module } from "@nestjs/common";
import { ChatController } from "@repo/backend/controllers/Chat.js";
import { ChatService } from "@repo/backend/services/Chat.js";
import { LangFlowService } from "../services/Flow.js";
import { GotenbergService } from "../services/Gotenberg.js";
import { UserService } from "../services/User.js";
import { GroupService } from "../services/Group.js";
import { AudioService } from "../services/Audio.js";

@Module({
	imports: [],
	providers: [
		ChatService,
		LangFlowService,
		UserService,
		GroupService,
		GotenbergService,
		AudioService,
	],
	exports: [ChatService],
	controllers: [ChatController],
})
export class ChatModule {}
