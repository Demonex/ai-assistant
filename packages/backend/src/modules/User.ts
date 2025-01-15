import { Module } from "@nestjs/common";
import { ProfileController } from "@repo/backend/controllers/Profile.js";
import { UserService } from "@repo/backend/services/User.js";

@Module({
	imports: [],
	providers: [UserService],
	exports: [UserService],
	controllers: [ProfileController],
})
export class UserModule {}
