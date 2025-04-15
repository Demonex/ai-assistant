import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "neuro" })
export class NeuroEntity {
	@PrimaryKey()
	id!: number;

	@Property()
	title?: string;
}
