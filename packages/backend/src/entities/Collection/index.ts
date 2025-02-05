import {
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
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

	@ManyToOne(() => TenantEntity)
	tenant!: TenantEntity;

	@OneToMany(() => CollectionProvidersEntity, "collection")
	providers: CollectionProvidersEntity[];

	@OneToMany(() => GroupCollectionPermissionsEntity, "collection")
	groups: GroupCollectionPermissionsEntity[];
}
