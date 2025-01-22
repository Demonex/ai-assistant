import {
	Entity,
	PrimaryKey,
	Property,
	OneToOne,
	ManyToOne,
} from "@mikro-orm/core";
import { ProviderEntity } from "../Provider/index.js";
import { CollectionEntity } from "./index.js";

@Entity({ tableName: "collection_providers" })
export class CollectionProvidersEntity {
	@PrimaryKey()
	id!: number;

	@ManyToOne(() => CollectionEntity, { name: "_parent_id" })
	collection!: CollectionEntity;

	@ManyToOne(() => ProviderEntity, { name: "provider_id" })
	provider!: ProviderEntity;

	@Property()
	enabled!: boolean;

	@Property({ type: "jsonb" })
	settings: {
		[key: string]: unknown;
	};
}
