import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "model" })
export class ModelEntity {
	@PrimaryKey()
	id!: number;

	@Property()
	title?: string;

	@Property()
	type?: string;
}
