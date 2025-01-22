import { Entity, Enum, ManyToOne, PrimaryKey } from "@mikro-orm/core";
import { GroupEntity } from "./index.js";

export enum GROUP_PERMISSION {
	admin = "admin",
	collection = "collection",
	model = "model",
	group = "group",
	user = "user",
}

@Entity({ tableName: "group_group_permissions" })
export class GroupPermissionsEntity {
	@PrimaryKey()
	id!: number;

	@ManyToOne(() => GroupEntity, { name: "parent_id" })
	group!: GroupEntity;

	@Enum({
		nativeEnumName: "enum_group_group_permissions",
		name: "value",
	})
	permission: GROUP_PERMISSION;
}
