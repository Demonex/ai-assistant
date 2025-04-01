import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserId } from "@repo/backend/decorators/user.js";
import { TenantService } from "../services/Tenant.js";

@ApiTags("tenant")
@Controller("/api/v1/tenants")
export class TenantController {
	constructor(public service: TenantService) {}

	@ApiBearerAuth("bearer-sid")
	@ApiOperation({ summary: "get tenant" })
	@Get()
	@HttpCode(200)
	async getTenants(@UserId() id?: number) {
		return this.service.tenants(id);
	}
}
