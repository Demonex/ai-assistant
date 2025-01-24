import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "tenant" })
export class TenantEntity {
	@PrimaryKey()
	id!: number;

	@Property()
	title?: string;

	@Property()
	description?: string;
}
