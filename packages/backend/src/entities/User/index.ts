import type { Ref } from "@typegoose/typegoose";
import { index, modelOptions, plugin, prop } from "@typegoose/typegoose";
import { _BaseEntity } from "@repo/backend/entities/_BaseEntity.js";
import {
	defaultModelOptions,
	defaultSchemaOptions,
} from "@repo/backend/mongoose.config.js";
import { getEmail } from "@repo/backend/utils";
import UserAvatarEntity from "@repo/backend/entities/User/Media/Avatar.js";
import autopopulate from "mongoose-autopopulate";

class SubscriptionStripe {
	@prop()
	public cid!: string;
}

class Subscription {
	@prop({ _id: false })
	public stripe?: SubscriptionStripe;
}

class Ban {
	@prop()
	public reason?: string;
}

class Interest {
	@prop()
	public type?: string;
	@prop()
	public identifier?: string;
	@prop()
	public answer?: string;
}

class Params {
	@prop()
	public birthday?: string;
	@prop()
	public sex?: string;
	@prop()
	public lookingForSex?: string;
	@prop()
	public lookingForAge?: string;
}

export enum Languages {
	EN = "en",
	RU = "ru",
}

export enum Currencies {
	USD = "usd",
	RUB = "rub",
}

// @plugin(autopopulate)
@plugin(autopopulate)
@modelOptions({
	...defaultModelOptions,
	schemaOptions: {
		...defaultSchemaOptions,
		toJSON: {
			...defaultSchemaOptions.toJSON,
			virtuals: true,
			transform: (
				doc,
				{ _id, createdAt, updatedAt, providers, password, roles, ...rest },
			) => ({
				id: _id,
				createdAt,
				updatedAt,
				...rest,
			}),
		},
		collection: "user",
	},
	options: {
		customName: "user",
	},
})
@index(
	{ email: 1 },
	{
		unique: true,
		// lowercase:true,
		sparse: true,
		// trim:true,
		background: true,
	},
)
@index(
	{ providers: 1 },
	{
		unique: false,
		background: true,
	},
)
export class UserEntity extends _BaseEntity {
	@prop({
		set: (str: string) => (str ? getEmail(str) : undefined),
		get: (str: string) => str || null,
	})
	email?: string;
	@prop({
		default: false,
	})
	emailVerified?: boolean;

	@prop({
		default: null,
		select: false,
	})
	password?: string;
	@prop({
		enum: Languages,
		default: Languages.EN,
		addNullToEnum: true,
	})
	language?: Languages;
	@prop({
		enum: Currencies,
		default: Currencies.USD,
		addNullToEnum: true,
	})
	currency?: Currencies;
	@prop({
		_id: false,
	})
	subscription?: Subscription;
	@prop({ default: false })
	consent?: boolean;
	@prop({
		default: [],
		type: [String],
		select: false,
		set: (ar: string[] | undefined) =>
			Array.isArray(ar) ? [...new Set(ar)] : [],
		get: (ar: string[] | undefined) => ar,
	})
	providers?: string[];

	get providersSafe(): string[] {
		return Array.isArray(this.providers)
			? this.providers.reduce<string[]>((prev, provider) => {
					const providerSafe = provider.split("_").shift();
					return providerSafe ? [...prev, providerSafe] : prev;
				}, [])
			: [];
	}

	@prop()
	name?: string;

	@prop()
	activationLink?: string;

	@prop({
		default: ["user"],
		type: [String],
		set: (ar: string[] | undefined) =>
			Array.isArray(ar) ? ar.map((str) => str.toLowerCase().trim()) : [],
		get: (ar: string[] | undefined) => ar,
	})
	roles?: string[];
	@prop({
		default: [],
		type: () => Ban,
	})
	bans?: Ban[];

	@prop({
		ref: () => UserAvatarEntity,
		autopopulate: {
			select: ["_id", "mimeType", "filename", "url"],
		},
	})
	avatar?: Ref<UserAvatarEntity>;

	@prop({
		default: {},
		_id: false,
		type: () => Params,
	})
	params?: Params;
}

export const UserEntityDefaultSelect = [
	"id",
	"email",
	"name",
	"avatar",
	"emailVerified",
	"language",
	"currency",
	"providers",
];

export const UserEntities = [UserEntity, UserAvatarEntity];
export default UserEntity;
