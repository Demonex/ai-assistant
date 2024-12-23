import { Entity, PrimaryKey, ManyToMany, Property } from "@mikro-orm/core";
import { UserRolesEntity } from "@repo/backend/entities/User/roles.js";

@Entity({ tableName: "user" })
export class UserEntity {
	@PrimaryKey()
	id!: number;

	@Property()
	email!: string;

	@Property({ hidden: true })
	password!: string;

	@ManyToMany(() => UserRolesEntity, undefined, {
		joinColumn: "id",
		referenceColumnName: "id",
		inverseJoinColumn: "parent_id",
		eager: true,
	})
	roles: UserRolesEntity[];
}
