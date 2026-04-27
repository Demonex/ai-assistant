import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Authorized } from "../decorators/auth.js";
import { TenantService } from "../services/Tenant.js";

ApiTags("tenant");
@Controller("/api/v1")
export class TenantController {
	constructor(private readonly tenantService: TenantService) {}

	@Authorized()
	@Get("/tenants")
	async getCollections() {
		return this.tenantService.getTenants();
	}
}
