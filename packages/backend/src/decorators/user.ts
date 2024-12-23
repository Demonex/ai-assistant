import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { get } from "lodash-es";

export const UserId = createParamDecorator(
	(key: string, ctx: ExecutionContext): number => {
		return Number(get(ctx.switchToHttp().getRequest<any>(), "session.user.id"));
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
