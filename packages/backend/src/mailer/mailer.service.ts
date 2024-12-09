import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";
import { SendMailDto } from "@repo/backend/dto/send-mail.dto.js";
import { type Options } from "nodemailer/lib/mailer";
import process from "process";

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
      }
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
    } catch(error) {
      console.log("Mailer, sendMail: ", error?.message);
    }
  }
}
