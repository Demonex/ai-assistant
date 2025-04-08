import { Controller, Get, HttpCode } from "@nestjs/common";
import { UserService } from "@repo/backend/services/User.js";
import { UserEmail, UserId } from "@repo/backend/decorators/user.js";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("profile")
@Controller("/api/v1/profile")
export class ProfileController {
	constructor(public service: UserService) {}

	@ApiBearerAuth("bearer-sid")
	@ApiOperation({ summary: "get profile" })
	@Get()
	@HttpCode(200)
	async me(@UserId() id?: number, @UserEmail() email?: string) {
		return this.service.me(id, email);
	}
}
