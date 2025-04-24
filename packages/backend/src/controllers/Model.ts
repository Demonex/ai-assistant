import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Authorized } from "../decorators/auth.js";
import { ModelService } from "../services/Models.js";
import { CreateModelDto, UpdateModelDto } from "../dto/Model.js";

ApiTags("model");
@Controller("/api/v1")
export class ModelController {
	constructor(private readonly modelService: ModelService) {}

	@Authorized()
	@Get("/models")
	async getModels() {
		return this.modelService.getModels();
	}

	@Authorized()
	@Get("/models/:id")
	async getModel(@Param("id", ParseIntPipe) id: number) {
		return this.modelService.getModel(id);
	}

	@Authorized()
	@Post("/models")
	async createModel(@Body() createModelDto: CreateModelDto) {
		return this.modelService.createModel(createModelDto);
	}

	@Authorized()
	@Patch("models/:id")
	async updateModel(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateModelDto: UpdateModelDto,
	) {
		return this.modelService.updateModel(id, updateModelDto);
	}
}
