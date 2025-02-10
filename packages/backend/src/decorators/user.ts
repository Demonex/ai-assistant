import {
	createParamDecorator,
	HttpException,
	HttpStatus,
	type ExecutionContext,
} from "@nestjs/common";
import { get } from "lodash-es";
import { HttpStatusMessages } from "../messages/http.js";

export const UserId = createParamDecorator(
	(key: string, ctx: ExecutionContext): number => {
		return Number(get(ctx.switchToHttp().getRequest<any>(), "session.user.id"));
	},
);
export const TenantId = createParamDecorator(
	(key: string, ctx: ExecutionContext): number => {
		const res = Number(
			get(ctx.switchToHttp().getRequest<any>(), "headers.x-tenant", 1),
		);
		if (Number.isNaN(res)) {
			throw new HttpException(
				HttpStatusMessages.BAD_REQUEST,
				HttpStatus.BAD_REQUEST,
			);
		}

		return res;
	},
);
export const UserEmail = createParamDecorator(
	(key: string, ctx: ExecutionContext): number | undefined => {
		return get(ctx.switchToHttp().getRequest<any>(), "session.user.email");
	},
); /*
export const UserLanguage = createParamDecorator(
	(key: string, ctx: ExecutionContext): Languages.EN | Languages.RU => {
		const lang = get(
			ctx.switchToHttp().getRequest<any>(),
			"session.user.language",
			Languages.EN,
		);
		return lang === Languages.RU ? Languages.RU : Languages.EN;
	},
);*/ /*
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
*/
