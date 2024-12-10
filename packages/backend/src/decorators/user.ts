import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import type { Types } from "mongoose";
import { get } from "lodash-es";
import { Languages } from "@repo/backend/entities/User/index.js";

export const UserId = createParamDecorator(
	(key: string, ctx: ExecutionContext): Types.ObjectId => {
		return get(ctx.switchToHttp().getRequest<any>(), "session.user.id");
	},
);
export const UserEmail = createParamDecorator(
	(key: string, ctx: ExecutionContext): Types.ObjectId | undefined => {
		return get(ctx.switchToHttp().getRequest<any>(), "session.user.email");
	},
);
export const UserLanguage = createParamDecorator(
	(key: string, ctx: ExecutionContext): Languages.EN | Languages.RU => {
		const lang = get(
			ctx.switchToHttp().getRequest<any>(),
			"session.user.language",
			Languages.EN,
		);
		return lang === Languages.RU ? Languages.RU : Languages.EN;
	},
);
export const Language = createParamDecorator(
	(key: string, ctx: ExecutionContext): Languages.EN | Languages.RU => {
		const lang = get(
			ctx.switchToHttp().getRequest<any>(),
			"cookies.i18next",
			Languages.EN,
		);
		return lang === Languages.RU ? Languages.RU : Languages.EN;
	},
);
