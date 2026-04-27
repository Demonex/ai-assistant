import { Module } from "@nestjs/common";
import { ProviderService } from "@repo/backend/services/Provider.js";
import { ProviderController } from "@repo/backend/controllers/Provider.js";

@Module({
	imports: [],
	providers: [ProviderService],
	exports: [ProviderService],
	controllers: [ProviderController],
})
export class ProviderModule {}
