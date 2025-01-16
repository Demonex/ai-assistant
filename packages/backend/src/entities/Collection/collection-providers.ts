import { Entity, PrimaryKey, Property, OneToOne } from "@mikro-orm/core";
import { ProviderEntity } from "../Provider/index.js";

@Entity({ tableName: "collection_providers" })
export class CollectionProvidersEntity {
	@PrimaryKey()
	id!: number;

	@Property({ hidden: true, name: "_parent_id" })
	parent_id!: number;

	@Property()
	enabled!: boolean;

	@OneToOne({ fieldName: "provider_id" })
	provider!: ProviderEntity;

	@Property({ type: "jsonb" })
	settings: {
		[key: string]: unknown;
	};
}
