import {
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
	type Rel,
} from "@mikro-orm/core";
import { ProviderEntity } from "../Provider/index.js";
import { CollectionEntity } from "./index.js";

@Entity({ tableName: "collection_providers" })
export class CollectionProvidersEntity {
	@PrimaryKey()
	id!: number;

	@ManyToOne(() => CollectionEntity, { name: "_parent_id" })
	collection!: Rel<CollectionEntity>;

	@ManyToOne(() => ProviderEntity, { name: "provider_id" })
	provider!: Rel<ProviderEntity>;

	@Property()
	enabled!: boolean;

	@Property({ type: "jsonb" })
	settings: {
		[key: string]: unknown;
	};
}
