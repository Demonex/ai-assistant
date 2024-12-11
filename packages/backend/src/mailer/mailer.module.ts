import { Module } from "@nestjs/common";
import { MailerService } from '@repo/backend/mailer/mailer.service.js';

@Module({
	controllers: [],
	providers: [MailerService],
	exports: [MailerService],
})
export class MailerModule {}
