import { plugin } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { index, modelOptions, prop } from "@typegoose/typegoose";
import { _BaseEntity } from "../_BaseEntity.js";
import {
	defaultModelOptions,
	defaultSchemaOptions,
} from "../../mongoose.config.js";
import UserEntity from "../User";
import SubscriptionPlanEntity from "./Plan";
import autopopulate from "mongoose-autopopulate";

@plugin(autopopulate)
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
