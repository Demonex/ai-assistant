import { Entity, PrimaryKey, ManyToMany, Property } from "@mikro-orm/core";

@Entity()
export class UserRolesEntityMO {
	@PrimaryKey()
	id!: number;

	@Property()
	parent_id!: number;

	@Property()
	value!: string;
}
