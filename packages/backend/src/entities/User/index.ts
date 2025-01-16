import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

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
}
