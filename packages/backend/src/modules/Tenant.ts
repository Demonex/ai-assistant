import { Module } from "@nestjs/common";
import { TenantService } from "../services/Tenant";
import { TenantController } from "../controllers/Tenant";

@Module({
	imports: [],
	providers: [TenantService],
	exports: [TenantService],
	controllers: [TenantController],
})
export class TenantModule {}
