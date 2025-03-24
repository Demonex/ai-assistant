import { Module } from "@nestjs/common";
import { AuthController } from "@repo/auth/controllers/Auth.js";

@Module({
  imports: [],
  providers: [],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
