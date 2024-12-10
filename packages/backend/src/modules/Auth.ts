import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { AuthService } from "@repo/backend/services/Auth.js";
import { UserEntities } from "@repo/backend/entities/User/index.js";
import { AuthController } from "@repo/backend/controllers/Auth.js";
import { SmtpService } from "@repo/backend/services/Smtp.js";
import { CrmService } from "@repo/backend/services/crm.service.js";
import { MailerModule } from "@repo/backend/mailer/mailer.module.js";

@Module({
	imports: [TypegooseModule.forFeature([...UserEntities]), MailerModule],
	providers: [AuthService, SmtpService, CrmService],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
