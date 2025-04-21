import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "wiki_docs" })
export class WikiDocEntity {
	@PrimaryKey()
	id!: number;

	@Property()
	ext_id!: string;

	@Property({ nullable: true })
	ext_parent_id?: string;

	@Property()
	name!: string;

	@Property()
	last_date_modified!: Date;

	@Property()
	view_url!: string;

	@Property()
	doc_collection_provider_id!: number;

	@Property({ onCreate: () => new Date() })
	created_at: Date = new Date();

	@Property({ onUpdate: () => new Date() })
	updated_at: Date = new Date();
}
