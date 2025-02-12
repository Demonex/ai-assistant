import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { GroupUsersEntity } from "../Group/group-users.js";

@Entity({ tableName: "user" })
export class UserEntity {
	@PrimaryKey()
	id!: number;

	@Property()
	email!: string;

	@Property({ hidden: true })
	password!: string;

	@Property({ nullable: true })
	superadmin: boolean;

	@OneToMany(() => GroupUsersEntity, "user")
	groups: GroupUsersEntity[];
}
