import {
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
} from "@mikro-orm/core";
import { GroupUsersEntity } from "../Group/group-users.js";
import { TenantEntity } from "../Tenant/index.js";

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

	// @ManyToOne(() => TenantEntity, { name: "current_tenant_id" })
	// currentTenant: TenantEntity;

	@OneToMany(() => GroupUsersEntity, "user")
	groups: GroupUsersEntity[];
}
