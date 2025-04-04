import { type ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CustomHeaders = createParamDecorator(
	(data, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest();
		return data ? req.headers[data] : req.headers;
	},
);
