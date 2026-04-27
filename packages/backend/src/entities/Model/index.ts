import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { TenantEntity } from "../Tenant/index.js";

@Entity({ tableName: "model" })
export class ModelEntity {
	@PrimaryKey()
	id!: number;

	@Property()
	title?: string;

	@Property()
	type?: string;

	@OneToOne(() => TenantEntity)
	tenant!: TenantEntity;
}
