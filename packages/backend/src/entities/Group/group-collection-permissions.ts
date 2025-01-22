import { Entity, Enum, ManyToOne, PrimaryKey } from "@mikro-orm/core";
import { CollectionEntity } from "../Collection/index.js";
import { GroupEntity } from "./index.js";

export enum GROUP_COLLECTION_PERMISSION {
	read = "r",
	read_write = "rw",
	read_write_delete = "rwd",
}

@Entity({ tableName: "group_collection_permissions" })
export class GroupCollectionPermissionsEntity {
	@PrimaryKey()
	id!: number;

	@ManyToOne(() => GroupEntity, { name: "_parent_id" })
	group!: GroupEntity;

	@ManyToOne(() => CollectionEntity, { name: "collection_id" })
	collection!: CollectionEntity;

	@Enum({
		nativeEnumName: "enum_group_collection_permissions_permissions",
		name: "permissions",
	})
	permission: GROUP_COLLECTION_PERMISSION;
}
