import {
	Entity,
	PrimaryKey,
	Property,
	OneToOne,
	ManyToOne,
	type Rel,
} from "@mikro-orm/core";
import { UserEntity } from "../User/index.js";
import { GroupEntity } from "./index.js";

@Entity({ tableName: "group_rels" })
export class GroupUsersEntity {
	@PrimaryKey()
	id!: number;

	@ManyToOne(() => GroupEntity, { name: "parent_id" })
	group!: Rel<GroupEntity>;

	@ManyToOne(() => UserEntity, { name: "user_id" })
	user!: Rel<UserEntity>;

	@Property()
	path: string;
}
