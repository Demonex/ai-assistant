import { Body, Controller, HttpCode, Post, Request } from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiExcludeEndpoint,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";
import {
	ApiKey,
	Authorized,
	Unauthorized,
} from "@repo/backend/decorators/auth.js";
import { UserId } from "@repo/backend/decorators/user.js";
import { AuthSignInDto, AuthSignUpDto } from "@repo/backend/dto/Auth.js";
import { validateDto } from "@repo/backend/middlewares/validateDto.js";
import { AuthService } from "@repo/backend/services/Auth.js";

@ApiTags("auth")
@Controller("/api")
export class AuthController {
	constructor(public service: AuthService) {}

	@ApiBearerAuth("bearer-sid")
	@ApiOperation({ summary: "sign-out user" })
	@Authorized()
	@Post("/rest/auth/sign-out")
	@HttpCode(200)
	async signOut(@UserId() userId: number) {
		const result = await this.service.signOut();
		return {
			success: result,
		};
	}

	@ApiExcludeEndpoint(process.env.ENV !== "development")
	@Authorized()
	@Post("/admin/user/logout")
	@HttpCode(200)
	async logOut(@UserId() userId: number) {
		const result = await this.service.signOut();
		return {
			success: result,
		};
	}

	@Unauthorized()
	@Post("/rest/auth/email/sign-in")
	@HttpCode(200)
	async signIn(@Request() request: any, @Body() args: AuthSignInDto) {
		await validateDto(AuthSignInDto, args, request);
		const profile = await this.service.signInByEmail(args);
		return profile;
	}

	@Unauthorized()
	@Post("/rest/auth/email/sign-up")
	async signUp(@Request() request: any, @Body() args: AuthSignUpDto) {
		await validateDto(AuthSignUpDto, args, request);
		const profile = await this.service.signUpByEmail(args, false);
		return profile;
	}
}
