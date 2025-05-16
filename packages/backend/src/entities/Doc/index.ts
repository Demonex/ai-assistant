import {
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
	type Rel,
} from "@mikro-orm/core";
import { CollectionEntity } from "../Collection/index.js";
import { ProviderEntity } from "../Provider/index.js";

@Entity({ tableName: "doc" })
export class DocEntity {
	@PrimaryKey()
	id: number;

	@Property()
	filename: string;

	@Property({ name: "file_uuid" })
	fileUuid: string;

	@Property()
	filesize: number;

	@Property({ name: "mime_type" })
	mimeType: string;

	@ManyToOne(() => CollectionEntity, { name: "collection_id" })
	collection!: Rel<CollectionEntity>;

	@ManyToOne(() => ProviderEntity, { name: "provider_id" })
	provider!: Rel<ProviderEntity>;
}
