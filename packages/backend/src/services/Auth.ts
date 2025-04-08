import { EntityManager } from "@mikro-orm/core";
import { InjectRedis } from "@nestjs-modules/ioredis";
import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	Scope,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { BCRYPT_SALT_ROUNDS } from "@repo/backend/constants.js";
import type { AuthSignUpDto } from "@repo/backend/dto/Auth.js";
import { UserEntity } from "@repo/backend/entities/User/index.js";
import { HttpStatusMessages } from "@repo/backend/messages/http.js";
import * as bcrypt from "bcryptjs";
import { isEmail } from "class-validator";
import { type Request } from "express";
import type { Redis } from "ioredis";

declare module "express-session" {
	export interface SessionData {
		user: Partial<UserEntity>;
	}
}

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
	constructor(
		@Inject(REQUEST) private readonly request: Request,
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

	async signInByEmail(args): Promise<UserEntity> {
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
			email: user.email,
			superadmin: user.superadmin,
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
			if (counter && Number(counter) > 10) {
				throw new HttpException(
					{
						statusCode: HttpStatus.TOO_MANY_REQUESTS,
					},
					HttpStatus.TOO_MANY_REQUESTS,
				);
			}
		}

		const { name, email, password } = args;
		const hashPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

		const user = await this.createUserByEmail({
			name,
			email,
			password: hashPassword,
		});

		this.request.session.user = {
			id: user.id,
			email: user.email,
			superadmin: user.superadmin,
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

	private async createUserByEmail(
		args: Partial<UserEntity>,
	): Promise<UserEntity> {
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
}
