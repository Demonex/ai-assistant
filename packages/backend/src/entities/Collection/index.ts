import { Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ProviderEntity } from "../Provider/index.js";
import { CollectionProvidersEntity } from "./collection-providers.js";

@Entity({ tableName: "collection" })
export class CollectionEntity {
	@PrimaryKey()
	id: number;

	@Property()
	title: string;

	@ManyToMany(() => CollectionProvidersEntity, undefined, {
		joinColumn: "_parent_id",
		referenceColumnName: "id",
		inverseJoinColumn: "id",
	})
	providers: CollectionProvidersEntity[];
}
