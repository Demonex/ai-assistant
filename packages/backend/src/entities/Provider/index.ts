import {
	Entity,
	Enum,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
	type Rel,
} from "@mikro-orm/core";
import { CollectionProvidersEntity } from "../Collection/collection-providers.js";
import { TenantEntity } from "../Tenant/index.js";

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
	})
	type: PROVIDER_TYPE;

	@ManyToOne(() => TenantEntity, { name: "tenant_id" })
	tenant: Rel<TenantEntity>;

	@OneToMany(() => CollectionProvidersEntity, "provider")
	providers: CollectionProvidersEntity[];
}
