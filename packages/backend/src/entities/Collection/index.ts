import {
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryKey,
	Property,
} from "@mikro-orm/core";
import { ProviderEntity } from "../Provider/index.js";
import { CollectionProvidersEntity } from "./collection-providers.js";
import { GroupCollectionPermissionsEntity } from "../Group/group-collection-permissions.js";

@Entity({ tableName: "collection" })
export class CollectionEntity {
	@PrimaryKey()
	id: number;

	@Property()
	title: string;

	@OneToMany(() => CollectionProvidersEntity, "collection")
	providers: CollectionProvidersEntity[];

	@OneToMany(() => GroupCollectionPermissionsEntity, "collection")
	groups: GroupCollectionPermissionsEntity[];
}
