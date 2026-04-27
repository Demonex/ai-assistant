import { Module } from "@nestjs/common";
import { DocController } from "../controllers/Doc.js";
import { DocService } from "../services/Doc.js";

@Module({
	imports: [],
	providers: [DocService],
	exports: [DocService],
	controllers: [DocController],
})
export class DocModule {}
