import { Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";

enum PROVIDER_TYPE {
	minio = "minio",
	confluence = "confluence",
}

@Entity({ tableName: "provider" })
export class ProviderEntity {
	@PrimaryKey()
	id: number;

	@Property()
	title: string;

	@Enum({
		nativeEnumName: "enum_provider_type",
	}) // or @Enum({ items: () => MyEnum1 })
	type: PROVIDER_TYPE;
}
