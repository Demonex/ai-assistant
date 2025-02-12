import {
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
	type Rel,
} from "@mikro-orm/core";
import { GroupCollectionPermissionsEntity } from "./group-collection-permissions.js";
import { GroupPermissionsEntity } from "./group-group-permissions.js";
import { GroupUsersEntity } from "./group-users.js";
import { TenantEntity } from "../Tenant/index.js";

@Entity({ tableName: "group" })
export class GroupEntity {
	@PrimaryKey()
	id: number;

	@Property()
	title: string;

	@ManyToOne(() => TenantEntity, { name: "tenant_id" })
	tenant: Rel<TenantEntity>;

	@OneToMany(() => GroupUsersEntity, "group")
	users: GroupUsersEntity[];

	@OneToMany(() => GroupPermissionsEntity, "group")
	groupPermissions: GroupPermissionsEntity[];

	@OneToMany(() => GroupCollectionPermissionsEntity, "group")
	groupCollectionPermissions: GroupCollectionPermissionsEntity[];
}
