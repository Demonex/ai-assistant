import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinTable,
	ManyToMany,
} from "typeorm";

@Entity({
	name: "user_roles",
})
export class UserRolesPG {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ select: false })
	parent_id!: string;

	@Column()
	value!: string;
}
