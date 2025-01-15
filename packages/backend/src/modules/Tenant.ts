import { Module } from "@nestjs/common";
import { TenantService } from "../services/Tenant.js";
import { TenantController } from "../controllers/Tenant.js";

@Module({
	imports: [],
	providers: [TenantService],
	exports: [TenantService],
	controllers: [TenantController],
})
export class TenantModule {}
