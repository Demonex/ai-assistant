import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Authorized } from "../decorators/auth.js";
import { ProviderService } from "../services/Provider.js";

@ApiTags("provider")
@Controller("/api/v1")
export class ProviderController {
	constructor(private readonly providerService: ProviderService) {}

	@Authorized()
	@Get("/providers")
	async getCollections() {
		return this.providerService.getProviders();
	}
}
