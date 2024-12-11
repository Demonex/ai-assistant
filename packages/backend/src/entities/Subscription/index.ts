import { plugin } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { index, modelOptions, prop } from "@typegoose/typegoose";
import { _BaseEntity } from "@repo/backend/entities/_BaseEntity.js";
import {
	defaultModelOptions,
	defaultSchemaOptions,
} from "@repo/backend/mongoose.config.js";
import UserEntity from "@repo/backend/entities/User/index.js";
import SubscriptionPlanEntity from "@repo/backend/entities/Subscription/Plan/index.js";
import autopopulate from "mongoose-autopopulate";

@plugin<any>(autopopulate)
@modelOptions({
	...defaultModelOptions,
	schemaOptions: {
		...defaultSchemaOptions,
		toJSON: {
			...defaultSchemaOptions.toJSON,
			virtuals: true,
			transform: (doc, { _id, createdAt, updatedAt, ...rest }) => ({
				id: _id,
				createdAt,
				updatedAt,
				...rest,
			}),
		},
		collection: "subscription",
	},
	options: {
		customName: "subscription",
	},
})
export class SubscriptionEntity extends _BaseEntity {
	@prop({
		ref: () => UserEntity,
	})
	user?: Ref<UserEntity>;

	@prop({ type: () => [String] })
	artists?: string[];

	@prop({
		required: true,
		autopopulate: true,
		ref: () => SubscriptionPlanEntity,
	})
	plan!: Ref<SubscriptionPlanEntity>;

	@prop({ default: true })
	renew?: boolean;

	@prop({ default: false })
	archived?: boolean;
}

export const SubscriptionEntityDefaultSelect = [
	"id",
	"user",
	"artists",
	"plan",
	"renew",
	"archived",
];

export default SubscriptionEntity;
