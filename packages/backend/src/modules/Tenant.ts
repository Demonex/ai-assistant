import { Module } from "@nestjs/common";
import { TenantController } from "@repo/backend/controllers/Tenant.js";
import { TenantService } from "@repo/backend/services/Tenant.js";

@Module({
	imports: [],
	providers: [TenantService],
	exports: [TenantService],
	controllers: [TenantController],
})
export class TenantModule {}
