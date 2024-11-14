import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailDto } from './dto/send-mail.dto';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
	mailTransport() {
		const transporter = nodemailer.createTransport({
			host: import.meta.env.VITE_EMAIL_HOST,
      port: import.meta.env.VITE_EMAIL_PORT,
      secure: true,
	  		auth: {
			    user: import.meta.env.VITE_EMAIL_USERNAME,
				  pass: import.meta.env.VITE_EMAIL_PASSWORD,
	    },
		});

    return transporter;
	}

  async sendMail(dto: SendMailDto) {
    const { recipients, subject, html } = dto;

    const transport = this.mailTransport();

    const options: Mail.Options = {
      from: import.meta.env.VITE_EMAIL_USERNAME,
      to: recipients,
      subject,
      html,
    };

    try {
      await transport.sendMail(options);
    } catch (error) {
      console.log('Mailer, sendMail: ', error?.message)
    }
  }
}
