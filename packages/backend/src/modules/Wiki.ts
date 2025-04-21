import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { WikiDocEntity } from "@repo/backend/entities/Wiki/index.js";
import { WikiService } from "@repo/backend/services/Wiki.js";
import { WikiController } from "@repo/backend/controllers/Wiki.js";

@Module({
	imports: [MikroOrmModule.forFeature([WikiDocEntity])],
	providers: [WikiService],
	controllers: [WikiController],
	exports: [WikiService],
})
export class WikiModule {}
