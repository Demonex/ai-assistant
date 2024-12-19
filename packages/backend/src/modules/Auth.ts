import { Module } from "@nestjs/common";
import { AuthService } from "@repo/backend/services/Auth.js";
import { AuthController } from "@repo/backend/controllers/Auth.js";
import { SmtpService } from "@repo/backend/services/Smtp.js";
import { MailerModule } from "@repo/backend/mailer/mailer.module.js";

@Module({
	imports: [MailerModule],
	providers: [AuthService, SmtpService],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
