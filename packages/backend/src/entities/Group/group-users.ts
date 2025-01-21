import {
	Entity,
	PrimaryKey,
	Property,
	OneToOne,
	ManyToOne,
} from "@mikro-orm/core";
import { UserEntity } from "../User/index.js";
import { GroupEntity } from "./index.js";

@Entity({ tableName: "group_rels" })
export class GroupUsersEntity {
	@PrimaryKey()
	id!: number;

	@ManyToOne(() => GroupEntity, { name: "parent_id" })
	group!: GroupEntity;

	@ManyToOne(() => UserEntity, { name: "user_id" })
	user!: UserEntity;

	@Property()
	path: string;
}
