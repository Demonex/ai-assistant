import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { GroupCollectionPermissionsEntity } from "./group-collection-permissions.js";
import { GroupPermissionsEntity } from "./group-group-permissions.js";
import { GroupUsersEntity } from "./group-users.js";

@Entity({ tableName: "group" })
export class GroupEntity {
	@PrimaryKey()
	id: number;

	@Property()
	title: string;

	@OneToMany(() => GroupUsersEntity, "group")
	users: GroupUsersEntity[];

	@OneToMany(() => GroupPermissionsEntity, "group")
	groupPermissions: GroupPermissionsEntity[];

	@OneToMany(() => GroupCollectionPermissionsEntity, "group")
	groupCollectionPermissions: GroupCollectionPermissionsEntity[];
}
