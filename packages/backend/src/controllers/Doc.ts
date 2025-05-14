import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UploadedFiles,
	UseInterceptors,
} from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ApiKey, Authorized } from "../decorators/auth.js";
import { DocService } from "../services/Doc.js";
import { ChatUploadMediaDto } from "../dto/Chat.js";
import { FilesInterceptor } from "@nestjs/platform-express";

@ApiTags("Doc")
@Controller("/api/v1")
export class DocController {
	constructor(private readonly docService: DocService) {}

	@Authorized()
	@Get("/docs")
	async getDocs() {
		return "Документы получены";
	}

	@Authorized()
	@Get("/docs/:id")
	async getDocById(@Param("id", ParseIntPipe) _id: number) {
		return "Документ с id получен";
	}

	@Authorized()
	@Post("/docs")
	async createDoc() {
		return "Документ создан";
	}

	@Authorized()
	@Patch("docs/:id")
	async updateDocument(@Param("id", ParseIntPipe) _id: number) {
		return "Документ обновлен";
	}

	@Authorized()
	@Post("docs/comparison")
	@ApiConsumes("multipart/form-data")
	@UseInterceptors(FilesInterceptor("media", 2))
	async comparisonDoc(
		@Body() data: ChatUploadMediaDto,
		@UploadedFiles() files: ChatUploadMediaDto["media"],
	) {
		return this.docService.comporisonDoc(files);
	}

	// @Authorized()
	@ApiKey()
	@Delete("docs/:id")
	async deleteDocument(@Param("id", ParseIntPipe) _id: number) {
		console.log("HELP!!!");

		return "Документ удален";
	}
}
