import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";
import type { SendMailDto } from "@repo/backend/dto/send-mail.dto.js";
import type { Options } from "nodemailer/lib/mailer";

@Injectable()
export class MailerService {
	mailTransport() {
		const transporter = createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			secure: true,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		} as any);

		return transporter;
	}

	async sendMail(dto: SendMailDto) {
		const { recipients, subject, html } = dto;

		const transport = this.mailTransport();

		const options: Options = {
			from: process.env.EMAIL_USERNAME,
			to: recipients,
			subject,
			html,
		};

		try {
			await transport.sendMail(options);
		} catch (error) {
			console.error("Mailer, sendMail: ", error?.message);
		}
	}
}
