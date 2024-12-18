import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinTable,
	ManyToMany,
} from "typeorm";
import { UserRolesPG } from "./roles-pg";

@Entity({
	name: "user",
})
export class UserEntityPG {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	email!: string;

	@Column()
	password!: string;

	@ManyToMany(() => UserRolesPG, { eager: true, nullable: true })
	@JoinTable({
		name: "user_roles",
		joinColumn: {
			name: "id",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "parent_id",
			referencedColumnName: "id",
		},
	})
	roles: UserRolesPG[];
}
