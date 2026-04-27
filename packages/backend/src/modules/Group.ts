import { Module } from "@nestjs/common";
import { GroupService } from "@repo/backend/services/Group.js";

@Module({
	imports: [],
	providers: [GroupService],
	exports: [GroupService],
	controllers: [],
})
export class GroupModule {}
