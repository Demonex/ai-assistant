import {
	modelOptions,
	plugin,
	prop,
	type Ref,
	Severity,
} from "@typegoose/typegoose";
import { _BaseEntity } from "@repo/backend/entities/_BaseEntity.js";
import {
	defaultModelOptions,
	defaultSchemaOptions,
} from "@repo/backend/mongoose.config.js";
import autopopulate from "mongoose-autopopulate";
import paginationPlugin from "@stigma-io/typegoose-cursor-pagination";
import PostMediaEntity from "@repo/backend/entities/Post/Media/index.js";
import { USER_LANGUAGES } from "@repo/backend/entities/enums.js";

export enum POST_STATUSES {
	PUBLISHED = "published",
	DRAFT = "draft",
}

type LocalizedField<T> = {
	[USER_LANGUAGES.EN]: T;
	[USER_LANGUAGES.RU]: T;
};

@plugin(paginationPlugin)
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
		collection: "post",
	},
	options: {
		customName: "post",
		allowMixed: Severity.ALLOW,
	},
})
export class PostEntity extends _BaseEntity {
	@prop({
		required: true,
		enum: POST_STATUSES,
	})
	_status!: POST_STATUSES;

	@prop({ required: true })
	title!: LocalizedField<string>;

	@prop()
	description?: LocalizedField<string>;

	@prop({
		ref: () => PostMediaEntity,
		autopopulate: {
			select: ["_id", "mimeType", "filename", "url"],
		},
	})
	preview?: Ref<PostMediaEntity>;

	@prop()
	content?: LocalizedField<Object>;
}

export const PostEntityDefaultSelect = [
	"id",
	"createdAt",
	"title",
	"description",
	"preview",
];

export default PostEntity;
