import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "wikijs_doc" })
export class WikiJsDocEntity {
	@PrimaryKey()
	id!: number;

	@Property()
	vectorFilePath!: string;

	@Property()
	collectionId!: number;

	@Property()
	providerId!: number;

	@Property()
	fileId!: number;

	@Property()
	fileName!: string;

	@Property()
	fileUpdateAt!: string;
}
