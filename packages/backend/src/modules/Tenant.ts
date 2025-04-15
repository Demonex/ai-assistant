import { Module } from "@nestjs/common";
import { TenantController } from "../controllers/Tenant.js";
import { TenantService } from "../services/Tenant.js";

@Module({
	imports: [],
	providers: [TenantService],
	exports: [TenantService],
	controllers: [TenantController],
})
export class TenantModule {}
