import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ModelEntity } from "../Model/index.js";

@Entity({ tableName: "neuro" })
export class NeuroEntity {
	@PrimaryKey()
	id!: number;

	@Property()
	title?: string;

	@OneToOne(() => ModelEntity)
	model!: ModelEntity;

	@Property({
		type: "jsonb",
		nullable: true,
	})
	modelSettings?: string | null;
}
