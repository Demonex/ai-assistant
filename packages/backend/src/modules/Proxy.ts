import { Module } from "@nestjs/common";
import { ProxyService } from "@repo/backend/services/Proxy.js";
import { ProxyController } from "@repo/backend/controllers/Proxy.js";
import { ProxyPaidController } from "@repo/backend/controllers/ProxyPaid";
import LogEntity from "@repo/backend/entities/Log";
import { TypegooseModule } from "nestjs-typegoose";
import SubscriptionEntity from "@repo/backend/entities/Subscription";
import SubscriptionPlanEntity from "@repo/backend/entities/Subscription/Plan";

@Module({
	imports: [
		TypegooseModule.forFeature([
			LogEntity,
			SubscriptionEntity,
			SubscriptionPlanEntity,
		]),
	],
	providers: [ProxyService],
	exports: [ProxyService],
	controllers: [ProxyController, ProxyPaidController],
})
export class ProxyModule {}
