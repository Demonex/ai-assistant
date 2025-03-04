import type { CollectionAfterChangeHook, CollectionConfig } from "payload";
import { parse } from "cookie";
import { unsign } from "cookie-signature";
import Redis from "ioredis";
import defaultAccess from "@/utilities/defaultAccess";
import { userMediaAvatar } from "@/collections/user/media/avatar";
import { tenant } from "../tenant";

const RedisSessionStore = new Redis(
	`redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
);

const userAccess = {
	...defaultAccess,
};

export const user: CollectionConfig = {
	slug: "user",
	labels: {
		singular: "Пользователь",
		plural: "Пользователи",
	},
	access: defaultAccess,
	admin: {
		// hideAPIURL: true,
		defaultColumns: ["name", "email", "superadmin"],
		useAsTitle: "name",
	},
	auth: {
		disableLocalStrategy: true,
		strategies: [
			{
				name: "redis-sessions",
				authenticate: async ({ headers }) => {
					const sid = parse(headers.get("cookie") || "")?.sid;
					if (!sid) {
						return {
							user: null,
						};
					}

					const key = unsign(sid.slice(2), process.env.COOKIE_SECRET);

					const userCache = key
						? (JSON.parse(
								(await RedisSessionStore.get(
									`${process.env.REDIS_SESSION_PREFIX}:${key}`,
								)) || "null",
							)?.user ?? null)
						: null;

					if (userCache) {
						userCache.collection = user.slug;
					}

					return {
						user: userCache,
					};
				},
			},
		],
	},
	fields: [
		{
			name: "name",
			type: "text",
			label: "Имя",
		},
		{
			name: "username",
			type: "text",
			label: "Никнейм",
		},
		{
			name: "email",
			type: "email",
			unique: true,
		},
		// {
		// 	name: "reset password token",
		// 	type: "text",
		// },
		// {
		// 	name: "confirmation token",
		// 	type: "text",
		// },
		// {
		// 	name: "confirmed",
		// 	type: "checkbox",
		// },
		// {
		// 	name: "blocked",
		// 	type: "checkbox",
		// },
		{
			name: "superadmin",
			label: "Суперадмин",
			type: "checkbox",
			hooks: {
				afterChange: [
					async ({ value, previousValue, req }) => {
						if (value === previousValue) {
							return;
						}

						const sid = parse(req.headers.get("cookie") || "")?.sid;
						if (!sid) {
							return {
								user: null,
							};
						}

						const key = unsign(sid.slice(2), process.env.COOKIE_SECRET);

						const userCache = key
							? (JSON.parse(
									(await RedisSessionStore.get(
										`${process.env.REDIS_SESSION_PREFIX}:${key}`,
									)) || "null",
								)?.user ?? null)
							: null;

						if (userCache) {
							userCache.superadmin = value;
						}

						return {
							user: userCache,
						};
					},
				],
			},
		},
		{
			name: "password",
			type: "text",
			admin: {
				hidden: true,
			},
		},
		{
			name: "avatar",
			type: "upload",
			relationTo: userMediaAvatar.slug as "user-media-avatar",
			label: "Аватар",
		},
	],
	timestamps: true,
};
