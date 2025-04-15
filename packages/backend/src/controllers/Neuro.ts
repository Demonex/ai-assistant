import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Authorized } from "../decorators/auth.js";
import { NeuroService } from "../services/Neuro.js";

ApiTags("neuro");
@Controller("/api/v1")
export class NeuroController {
	constructor(private readonly neuroService: NeuroService) {}

	@Authorized()
	@Get("/neuro")
	async getNeuro() {
		return this.neuroService.getNeuro();
	}
}
