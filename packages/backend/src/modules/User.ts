import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { UserService } from "@repo/backend/services/User.js";
import { ProfileController } from "@repo/backend/controllers/Profile.js";
import { UserEntities } from "@repo/backend/entities/User/index.js";

@Module({
	imports: [TypegooseModule.forFeature([...UserEntities])],
	providers: [UserService],
	exports: [UserService],
	controllers: [ProfileController],
})
export class UserModule {}
