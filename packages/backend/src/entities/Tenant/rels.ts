import { Entity, PrimaryKey, ManyToMany, Property } from "@mikro-orm/core";

@Entity({ tableName: "tenant_rels" })
export class TenantRelsEntity {
	@PrimaryKey()
	id!: number;

	@Property()
	parent_id!: number;

	@Property()
	path!: string;

	@Property()
	user_id!: string;
}
