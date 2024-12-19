import { Entity, PrimaryKey, ManyToMany, Property } from "@mikro-orm/core";
import { UserRolesEntityMO } from "@repo/backend/entities/User/roles-mo.js";

@Entity()
export class UserEntityMO {
	@PrimaryKey()
	id!: number;

	@Property()
	email!: string;

	@Property()
	password!: string;

	@ManyToMany(() => UserRolesEntityMO, undefined, {
		inverseJoinColumn: "parent_id",
	})
	roles: UserRolesEntityMO[];
}
