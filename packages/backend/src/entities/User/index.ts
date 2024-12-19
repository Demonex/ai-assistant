import { Entity, PrimaryKey, ManyToMany, Property } from "@mikro-orm/core";
import { UserRolesEntityMO } from "@repo/backend/entities/User/roles.js";

@Entity({ tableName: "user" })
export class UserEntityMO {
	@PrimaryKey()
	id!: number;

	@Property()
	email!: string;

	@Property({ hidden: true })
	password!: string;

	@ManyToMany(() => UserRolesEntityMO, undefined, {
		joinColumn: "id",
		referenceColumnName: "id",
		inverseJoinColumn: "parent_id",
		eager: true,
	})
	roles: UserRolesEntityMO[];
}
