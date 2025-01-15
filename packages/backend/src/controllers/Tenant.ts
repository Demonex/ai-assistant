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
import { UserEmail, UserId } from "@repo/backend/decorators/user.js";
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
import { TenantService } from "../services/Tenant.js";

@ApiTags("tenant")
@Controller("/api/tenant")
export class TenantController {
	constructor(public service: TenantService) {}

	@ApiBearerAuth("bearer-sid")
	@ApiOperation({ summary: "get tenant" })
	@Get()
	@HttpCode(200)
	async me(@UserId() id?: number, @UserEmail() email?: string) {
		return this.service.tenants(id);
	}
}
