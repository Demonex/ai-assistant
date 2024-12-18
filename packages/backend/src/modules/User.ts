import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { UserService } from "@repo/backend/services/User.js";
import { ProfileController } from "@repo/backend/controllers/Profile.js";
import { UserEntities } from "@repo/backend/entities/User/index.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntityPG } from "../entities/User/index-pg";

@Module({
	imports: [
		TypegooseModule.forFeature([...UserEntities]),
		TypeOrmModule.forFeature([UserEntityPG]),
	],
	providers: [UserService],
	exports: [UserService],
	controllers: [ProfileController],
})
export class UserModule {}
