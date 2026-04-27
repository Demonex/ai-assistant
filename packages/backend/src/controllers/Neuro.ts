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
import { NeuroService } from "../services/Neuro.js";
import { CreateNeuroDto, UpdateNeuroDto } from "../dto/Neuro.js";

ApiTags("neuro");
@Controller("/api/v1")
export class NeuroController {
	constructor(private readonly neuroService: NeuroService) {}

	@Authorized()
	@Get("/neuro")
	async getNeuro() {
		return this.neuroService.getNeuro();
	}

	@Authorized()
	@Get("/neuro/:id")
	async getNeuroById(@Param("id", ParseIntPipe) id: number) {
		return this.neuroService.getNeuroById(id);
	}

	@Authorized()
	@Post("/neuro")
	async createNeuro(@Body() createNeuroDto: CreateNeuroDto) {
		return this.neuroService.createNeuro(createNeuroDto);
	}

	@Authorized()
	@Patch("/neuro/:id")
	async updateNeuro(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateNeuroDto: UpdateNeuroDto,
	) {
		return this.neuroService.updateNeuro(id, updateNeuroDto);
	}
}
