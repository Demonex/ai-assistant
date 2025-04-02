import { Module } from "@nestjs/common";
import { AuthService } from "@repo/backend/services/Auth.js";
import { AuthController } from "@repo/backend/controllers/Auth.js";

@Module({
	imports: [],
	providers: [AuthService],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
