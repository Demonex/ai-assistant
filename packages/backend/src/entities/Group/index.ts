import {
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
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
	tenant: TenantEntity;

	@OneToMany(() => GroupUsersEntity, "group")
	users: GroupUsersEntity[];

	@OneToMany(() => GroupPermissionsEntity, "group")
	groupPermissions: GroupPermissionsEntity[];

	@OneToMany(() => GroupCollectionPermissionsEntity, "group")
	groupCollectionPermissions: GroupCollectionPermissionsEntity[];
}
