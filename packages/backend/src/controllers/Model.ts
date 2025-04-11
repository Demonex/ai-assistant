import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Authorized } from "../decorators/auth.js";
import { ModelService } from "../services/Models.js";

ApiTags("model");
@Controller("/api/v1")
export class ModelController {
	constructor(private readonly modelService: ModelService) {}

	@Authorized()
	@Get("/models")
	async getModels() {
		return this.modelService.getModels();
	}
}
