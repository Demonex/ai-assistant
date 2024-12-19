import { Entity, PrimaryKey, ManyToMany, Property } from "@mikro-orm/core";
import { TenantRelsEntity } from "@repo/backend/entities/Tenant/rels.js";

@Entity({ tableName: "tenant" })
export class TenantEntity {
	@PrimaryKey()
	id!: number;

	@Property()
	name?: string;

	@Property()
	description?: string;

	@ManyToMany(() => TenantRelsEntity, undefined, {
		joinColumn: "parent_id",
		referenceColumnName: "id",
		inverseJoinColumn: "id",
	})
	rels: TenantRelsEntity[];
}
