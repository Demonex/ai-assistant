import {
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
	type Rel,
} from "@mikro-orm/core";
import { GroupCollectionPermissionsEntity } from "../Group/group-collection-permissions.js";
import { CollectionProvidersEntity } from "./collection-providers.js";
import { TenantEntity } from "../Tenant/index.js";

@Entity({ tableName: "collection" })
export class CollectionEntity {
	@PrimaryKey()
	id: number;

	@Property()
	title: string;

	isEmpty: boolean;

	@Property()
	description: string;

	@ManyToOne(() => TenantEntity)
	tenant!: Rel<TenantEntity>;

	@OneToMany(() => CollectionProvidersEntity, "collection")
	providers: CollectionProvidersEntity[];

	@OneToMany(() => GroupCollectionPermissionsEntity, "collection")
	groups: GroupCollectionPermissionsEntity[];
}
