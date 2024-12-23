import { Entity, PrimaryKey, ManyToMany, Property } from "@mikro-orm/core";

@Entity({ tableName: "tenant_rels" })
export class TenantRelsEntity {
	@PrimaryKey()
	id!: number;

	@Property({ hidden: true })
	parent_id!: number;

	@Property()
	path!: string;

	@Property()
	user_id!: string;
}
