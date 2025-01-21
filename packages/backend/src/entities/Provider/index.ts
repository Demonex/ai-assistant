import { Entity, Enum, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { CollectionProvidersEntity } from "../Collection/collection-providers.js";

export enum PROVIDER_TYPE {
	minio = "minio",
	confluence = "confluence",
}

@Entity({ tableName: "provider" })
export class ProviderEntity {
	@PrimaryKey()
	id: number;

	@Property()
	title: string;

	@Property({ type: "jsonb" })
	settings: {
		[key: string]: unknown;
	};

	@Enum({
		nativeEnumName: "enum_provider_type",
	}) // or @Enum({ items: () => MyEnum1 })
	type: PROVIDER_TYPE;

	@OneToMany(() => CollectionProvidersEntity, "provider")
	providers: CollectionProvidersEntity[];
}
