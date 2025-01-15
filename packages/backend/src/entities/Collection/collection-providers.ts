import {
	Entity,
	PrimaryKey,
	ManyToMany,
	Property,
	OneToOne,
	ManyToOne,
} from "@mikro-orm/core";
import { ProviderEntity } from "../Provider/index.js";

@Entity({ tableName: "collection_providers" })
export class CollectionProvidersEntity {
	@PrimaryKey()
	id!: number;

	@Property({ hidden: true, name: "_parent_id" })
	parent_id!: number;

	@Property()
	enabled!: boolean;

	@Property()
	provider_id!: number;

	@ManyToOne()
	providerS: ProviderEntity;
}
