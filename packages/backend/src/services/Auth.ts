import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	NotFoundException,
	Scope,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import * as bcrypt from "bcryptjs";
import { InjectRedis } from "@nestjs-modules/ioredis";
import type { Redis } from "ioredis";
import { isEmail } from "class-validator";
import { randstr as randomStringGenerator } from "better-randstr";
import { BCRYPT_SALT_ROUNDS } from "@repo/backend/constants.js";
import { HttpStatusMessages } from "@repo/backend/messages/http.js";
import type { AuthRecoverDto, AuthSignUpDto } from "@repo/backend/dto/Auth.js";
import { SmtpService } from "./Smtp.js";
import { v4 as uuidv4 } from "uuid";
import { EntityManager } from "@mikro-orm/core";
import { UserEntity } from "@repo/backend/entities/User/index.js";
import { type Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
	constructor(
		@Inject(REQUEST) private readonly request: Request,
		@Inject(SmtpService) private readonly smtp: SmtpService,
		@InjectRedis() private readonly redisClient: Redis,
		private readonly em: EntityManager,
	) {}

	async signOut(): Promise<boolean> {
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

	async signInByEmail(args: Record<string, unknown>): Promise<UserEntity> {
		const keys = ["email", "password"];
		const { email, password: passwordCheck } = Object.fromEntries(
			Object.entries(args).filter(([_, __]) => keys.includes(_)),
		) as { email: string; password: string };
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
			email: user.email,
		};
		return user as UserEntity;
	}

	private async createUserByEmail(args: {
		name: string;
		email: string;
		password: string;
		consent: boolean;
		activationLink: string;
	}): Promise<UserEntity> {
		try {
			const user = this.em.create<UserEntity>(UserEntity, args);
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

	private async getUserByEmailOrUsername(login: string): Promise<UserEntity> {
		const criteria: { [k: string]: unknown } = {};
		if (isEmail(login)) {
			criteria.email = login;
		} else if (login) {
			criteria.username = login;
		} else {
			throw new Error("Internal Server Error");
		}
		const user = await this.em.findOne<UserEntity>(UserEntity, criteria);
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
		return user;
	}
}
