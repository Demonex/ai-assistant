import { Module } from "@nestjs/common";
import { ProviderService } from "../services/Provider.js";
import { ProviderController } from "../controllers/provider.js";

@Module({
	imports: [],
	providers: [ProviderService],
	exports: [ProviderService],
	controllers: [ProviderController],
})
export class ProviderModule {}
