import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	InternalServerErrorException,
	Param,
	Post,
	Redirect,
	Request,
	Res,
} from "@nestjs/common";
import {
	AuthRecoverDto,
	AuthSignInDto,
	AuthSignUpDto,
	RequestPasswordResetDto,
	ResetPasswordDto,
} from "@repo/backend/dto/Auth.js";
import { AuthService } from "@repo/backend/services/Auth.js";
import { Authorized, Unauthorized } from "@repo/backend/decorators/auth.js";
import { UserId } from "@repo/backend/decorators/user.js";
import {
	ApiBearerAuth,
	ApiExcludeEndpoint,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import type { RedirectResponse } from "@nestjs/core/router/router-response-controller.js";
import { validateDto } from "@repo/backend/middlewares/validateDto.js";
import type { Types } from "mongoose";

@ApiTags("auth")
@Controller("/api")
export class AuthController {
	constructor(public service: AuthService) {}

	@ApiBearerAuth("bearer-sid")
	@ApiOperation({ summary: "sign-out user" })
	@Authorized()
	@Post("/rest/auth/sign-out")
	@HttpCode(200)
	async signOut(@UserId() userId: Types.ObjectId) {
		const result = await this.service.signOut();
		return {
			success: result,
		};
	}

	@ApiExcludeEndpoint(process.env.ENV !== "development")
	@Authorized()
	@Post("/admin/user/logout")
	@HttpCode(200)
	async logOut(@UserId() userId: Types.ObjectId) {
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

	@Get("/rest/auth/activate/:link")
	async activate(@Param("link") link: string, @Res() res) {
		await this.service.activateAccount(link);
		return res.redirect(process.env.FRONTEND_URL);
	}

	@Post("/rest/auth/email/resend/:userId")
	async resend(@Param("userId") userId: string) {
		const result = await this.service.resendEmailConfirm(userId);

		if (result.success) {
			return result;
		}
		throw new InternalServerErrorException(result.message);
	}

	@Unauthorized()
	@Post("/rest/auth/email/recover")
	@HttpCode(200)
	async recover(@Request() request: any, @Body() args: AuthRecoverDto) {
		await validateDto(AuthRecoverDto, args, request);
		await this.service.recover(args);
		return {
			success: true,
		};
	}

	@ApiOperation({ summary: "Request password reset link" })
	@ApiResponse({ status: 201, description: "Password reset link sent" })
	@ApiResponse({ status: 400, description: "Invalid email address" })
	@Unauthorized()
	@Post("/rest/auth/request-password-reset")
	async requestPasswordReset(@Body() dto: RequestPasswordResetDto) {
		try {
			await this.service.requestPasswordReset(dto.email);

			return {
				success: true,
				message: "Password reset link sent",
			};
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	@Post("/rest/auth/email/reset-password")
	@ApiOperation({ summary: "Reset password" })
	@ApiResponse({ status: 201, description: "Password successfully reset" })
	@ApiResponse({ status: 400, description: "Invalid or expired token" })
	async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
		const { token, email, newPassword } = resetPasswordDto;
		try {
			await this.service.resetPassword(token, email, newPassword);
			return { success: true, message: "Password successfully reset" };
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	@ApiExcludeEndpoint(process.env.NODE_ENV !== "development")
	@Get("/rest/auth/email/recover/:code/:state")
	@Redirect(`${process.env.FRONTEND_URL || "/"}`, HttpStatus.SEE_OTHER)
	@ApiResponse({ status: HttpStatus.SEE_OTHER })
	async recoverVerify(
		@Param("code") recoverCode: string,
		@Param("state") verifyCode: string,
	): Promise<RedirectResponse> {
		const url = (await this.service.recover({ recoverCode, verifyCode }))
			.redirect;
		return {
			url,
			statusCode: HttpStatus.SEE_OTHER,
		};
	}
}
