import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	NotFoundException,
	Scope,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import bcrypt from "bcrypt";
import { InjectModel } from "nestjs-typegoose";
import type { ReturnModelType } from "@typegoose/typegoose";
import { InjectRedis } from "@nestjs-modules/ioredis";
import type { Redis } from "ioredis";
import md5 from "md5";
import { isEmail } from "class-validator";
import { randstr as randomStringGenerator } from "better-randstr";
import { BCRYPT_SALT_ROUNDS } from "@repo/backend/constants.js";
import { HttpStatusMessages } from "@repo/backend/messages/http.js";
import type { AuthRecoverDto, AuthSignUpDto } from "@repo/backend/dto/Auth.js";
import { UserEntity } from "@repo/backend/entities/User/index.js";
import { SmtpService } from "./Smtp.js";
import type { Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { MailerService } from "@repo/backend/mailer/mailer.service.js";
import { randomBytes } from "node:crypto";
import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { UserEntityMO } from "@repo/backend/entities/User/index-mo";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
	constructor(
		@Inject(REQUEST) private readonly request: any,
		@Inject(SmtpService) private readonly smtp: SmtpService,
		@InjectRedis() private readonly redisClient: Redis,
		private readonly mailerService: MailerService,
		private readonly orm: MikroORM,
		private readonly em: EntityManager,
	) {}

	async signOut(userId?: Types.ObjectId): Promise<boolean> {
		try {
			return await new Promise((resolve, reject) => {
				this.request.session.destroy((err) =>
					err ? reject(err) : resolve(true),
				);
			});
		} catch (err) {
			console.error(err.message);
			//
		}
		return false;
	}

	async signInByEmail(args: any): Promise<UserEntity> {
		const keys = ["email", "password"];
		const { email, password: passwordCheck } = Object.fromEntries(
			Object.entries(args).filter(([_, __]) => keys.includes(_)),
		) as any;
		const user = await this.getUserByEmailOrUsername(email);
		if (user.password) {
			await this.verifyUserPassword(user.password, passwordCheck);
		} else {
			throw new HttpException(
				{
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
					messages: [
						{
							messages: [HttpStatusMessages.INTERNAL_SERVER_ERROR],
						},
					],
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
		this.request.session.user = {
			id: user.id,
			language: user.language || "en",
			roles: user.roles?.map(({ value }) => value),
			email: user.email,
		};
		return user as UserEntity;
	}

	async signUpByEmail(
		args: AuthSignUpDto,
		ipRegLimit = true,
	): Promise<UserEntity> {
		const ipReg = `ip.reg:${this.request.ip}`;
		const counter = await this.redisClient.get(ipReg);
		if (ipRegLimit) {
			// console.log(ipReg,counter);
			if (counter && Number(counter) > 10) {
				throw new HttpException(
					{
						statusCode: HttpStatus.TOO_MANY_REQUESTS,
					},
					HttpStatus.TOO_MANY_REQUESTS,
				);
			}
		}

		const { name, email, password, consent } = args;
		const hashPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
		const activationLink = uuidv4();

		const user = await this.createUserByEmail({
			name,
			email,
			password: hashPassword,
			consent,
			activationLink,
		});

		// await this.sendConfirmEmail(email, activationLink);

		this.request.session.user = {
			id: user.id,
			language: user.language,
			roles: user.roles?.map(({ value }) => value),
		};

		if (ipRegLimit) {
			await this.redisClient.set(
				ipReg,
				`${1 + (counter ? Number(counter) : 0)}`,
				"PX",
				24 * 60 * 60 * 1000,
			);
		}
		return user;
	}
	/*
  async resendEmailConfirm(userId: string) {
    try {
      const user = await this.repoUser.findOne({ _id: userId });
      const { email, activationLink } = user;
      await this.sendConfirmEmail(email, activationLink);

      return { success: true };
    } catch (error) {
      return { success: false, message: "Failed to resendEmailConfirm" };
    }
  }*/
	/*
  async recover({
                  login: username,
                  recoverCode,
                  verifyCode,
                }: AuthRecoverDto & {
    recoverCode?: string;
    verifyCode?: string;
  }): Promise<{ redirect: string }> {
    const user = username
      ? await this.repoUser.findOne(
        isEmail(username) ? { email: username } : { username },
      )
      : null;
    if (!user && !(recoverCode && verifyCode)) {
      return { redirect: `${process.env.FRONTEND_URL}/error?code=recover` };
    }
    const recoverExistRequest = (
      user ? md5(`${user.id}:email:recover`) : recoverCode
    ) as string;
    const recoverExist = await this.redisClient.get(recoverExistRequest);
    if (user && recoverExist) {
      return { redirect: `${process.env.FRONTEND_URL}/error?code=recover` };
    }
    if (!recoverExist && user) {
      const recoverExistRequestVerify = md5(
        `${user.id}:email:recover:${randomStringGenerator()}`,
      );
      await this.redisClient.set(
        recoverExistRequest,
        JSON.stringify({
          user: user,
          recoverExistRequestVerify,
        }),
        "PX",
        24 * 60 * 60 * 1000,
      );
      try {
        console.log("smtp");
        //language by user
        /!*this.smtp
          .sendEmail('recover-by-email',{
            appeal:`${user.firstName||user.username||''}`,
            email:user.email,
            recoverExistRequest,
            recoverExistRequestVerify
          })
          .then();*!/
      } catch (e) {
        console.error(e.message);
      }
    } else if (recoverExist && verifyCode) {
      const { user, recoverExistRequestVerify } = JSON.parse(recoverExist);
      if (verifyCode === recoverExistRequestVerify) {
        /!*if(this.request.session.user&&this.request.session.user.id!==user.id){
          return {redirect:`${process.env.FRONTEND_URL}/error?code=recover`};
        }*!/
        this.request.session.user = user;
        await this.redisClient.del(recoverExistRequest);
        return {
          redirect: `${process.env.FRONTEND_URL}/user/restorePassword`,
        };
      }
      return { redirect: `${process.env.FRONTEND_URL}/error?code=recover` };
    }
    return { redirect: `${process.env.FRONTEND_URL}/error?code=recover` };
  }*/

	// private async createUserByEmail(args): Promise<UserEntity & { id?: string; _id?: Types.ObjectId }> {

	//   try {
	//     // return await this.repoUser.create(args);

	//     const user = await this.repoUser.create(args);

	//     return user;

	//   } catch (e) {
	//     console.error(e.message);
	//     switch (e.code) {
	//       case 11000: {
	//         if ('email' in e.keyValue) throw new HttpException({
	//           statusCode: HttpStatus.BAD_REQUEST,
	//           messages: [{
	//             property: 'email',
	//             messages: [HttpStatusMessages.EMAIL_ALREADY_EXIST]
	//           }]
	//         }, HttpStatus.BAD_REQUEST);
	//         /*if ('username' in e.keyValue) throw new HttpException({
	//           statusCode: HttpStatus.BAD_REQUEST,
	//           messages: [{
	//             property: 'username',
	//             messages: [HttpStatusMessages.USERNAME_ALREADY_EXIST]
	//           }]
	//         }, HttpStatus.BAD_REQUEST);*/
	//         break;
	//       }
	//     }
	//     throw new Error('Internal server error');
	//   }
	// }

	private async createUserByEmail(args): Promise<any> {
		try {
			const user = this.em.create<UserEntityMO>(UserEntityMO, args);
			await this.em.persistAndFlush(user);
			return user;
		} catch (error) {
			console.error("Error creating user:", error);

			if (error.code === 11000 && "email" in error.keyValue) {
				throw new HttpException(
					{
						statusCode: HttpStatus.BAD_REQUEST,
						messages: [
							{ property: "email", messages: ["Email already exists"] },
						],
					},
					HttpStatus.BAD_REQUEST,
				);
			}

			throw new HttpException(
				"Internal Server Error",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	private async getUserByEmailOrUsername(login: string): Promise<any> {
		const criteria: { [k: string]: unknown } = {};
		if (isEmail(login)) {
			criteria.email = login;
		} else if (login) {
			criteria.username = login;
		} else {
			throw new Error("Internal Server Error");
		}
		const user = await this.em.findOne<UserEntityMO>(UserEntityMO, criteria);
		if (!user) {
			throw new HttpException(
				{
					statusCode: HttpStatus.UNAUTHORIZED,
					messages: [
						{
							messages: [HttpStatusMessages.UNAUTHORIZED],
						},
					],
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
		console.log("user", user);
		return user;
	}

	async verifyUserPassword(
		password: string,
		passwordCheck: string,
	): Promise<boolean> {
		const passwordMatches = await bcrypt.compare(passwordCheck, password);
		if (!passwordMatches) {
			throw new HttpException(
				{
					statusCode: HttpStatus.UNAUTHORIZED,
					messages: [
						{
							messages: [HttpStatusMessages.UNAUTHORIZED],
						},
					],
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
		return true;
	}
	/*

  async activateAccount(link: string) {
    const user = await this.repoUser.findOne({ activationLink: link });

    if (!user) {
      throw new NotFoundException(
        "Activation link is invalid or user not found.",
      );
    }

    user.emailVerified = true;

    await user.save();
  }
*/

	private createConfirmEmailText(link: string) {
		return `<p>Добрый день.</p>
      <p>Для подтверждения аккаунта Rifify перейдите по ссылке: </p>
      <a href=${link}>${link}</a>
    `;
	}

	private createResetEmailText(link: string) {
		return `<p>Добрый день.</p>
    <p>Для восстановления пароля перейдите по ссылке:</p>
    <a href=${link}>${link}</a>
    `;
	}

	private async sendConfirmEmail(email: string, activationLink: string) {
		await this.mailerService.sendMail({
			recipients: [email],
			subject: "Подтвердите свою почту и начните использовать Rifify",
			html: this.createConfirmEmailText(
				`${process.env.BACKEND_URL}/api/rest/auth/activate/${activationLink}`,
			),
		});
	}

	private async sendResetPasswordEmail(email: string, link: string) {
		await this.mailerService.sendMail({
			recipients: [email],
			subject: "Восстановление пароля rifify",
			html: this.createResetEmailText(link),
		});
	}
	/*
  async requestPasswordReset(email: string) {
    const user = await this.repoUser.findOne({ email });
    if (!user) throw new Error("User not found");

    const token = randomBytes(32).toString("hex");
    const tokenHash = await bcrypt.hash(token, 10);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    user.resetToken = tokenHash;
    user.resetTokenExpires = expiration;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/auth/new-password?token=${token}&email=${email}`;
    await this.sendResetPasswordEmail(email, resetLink);
  }*/
	/*
  async resetPassword(
    token: string,
    email: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.repoUser.findOne({ email });
    if (!user || !user.resetToken || !user.resetTokenExpires) {
      throw new Error("Invalid or expired reset token");
    }

    if (user.resetTokenExpires < new Date()) {
      throw new Error("Invalid or expired reset token");
    }

    const isTokenValid = await bcrypt.compare(token, user.resetToken);
    if (!isTokenValid || user.resetTokenExpires < new Date()) {
      throw new Error("Invalid or expired reset token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();
  }*/
}
