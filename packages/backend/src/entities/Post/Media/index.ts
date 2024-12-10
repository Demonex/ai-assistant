import { modelOptions, prop } from "@typegoose/typegoose";
import { _BaseEntity } from "@repo/backend/entities/_BaseEntity.js";
import {
	defaultModelOptions,
	defaultSchemaOptions,
} from "@repo/backend/mongoose.config.js";

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
		collection: "post-media",
	},
})
export class PostMediaEntity extends _BaseEntity {
	@prop({ required: true })
	filename!: string;
	@prop({ required: true })
	filesize!: number;
	@prop({ required: true })
	mimeType!: string;

	get url(): string {
		return `${process.env.SERVER_URL}/post-media/${encodeURI(this.filename)}`;
	}
}

export const PostMediaEntityDefaultSelect = [
	"id",
	"filename",
	"filesize",
	"mimeType",
];
export default PostMediaEntity;
