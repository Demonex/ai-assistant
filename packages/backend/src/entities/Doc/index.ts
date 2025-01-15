import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "doc" })
export class DocEntity {
	@PrimaryKey()
	id: number;
	@Property()
	filename: string;
	@Property()
	filesize: number;
	@Property({ name: "mime_type" })
	mimeType: string;
}
