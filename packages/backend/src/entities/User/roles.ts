import { Entity, PrimaryKey, ManyToMany, Property } from "@mikro-orm/core";

@Entity({ tableName: "user_roles" })
export class UserRolesEntityMO {
	@PrimaryKey()
	id!: number;

	@Property({ hidden: true })
	parent_id!: number;

	@Property()
	value!: string;
}
