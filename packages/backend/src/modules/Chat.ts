import { Module } from "@nestjs/common";
import { ChatController } from "@repo/backend/controllers/Chat.js";
import { ChatService } from "@repo/backend/services/Chat.js";
import { LangFlowService } from "@repo/backend/services/Flow.js";
import { GotenbergService } from "@repo/backend/services/Gotenberg.js";
import { UserService } from "@repo/backend/services/User.js";
import { GroupService } from "@repo/backend/services/Group.js";
import { AudioService } from "@repo/backend/services/Audio.js";

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
