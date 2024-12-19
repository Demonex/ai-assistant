import { MikroORM, EntityManager, PopulateHint } from "@mikro-orm/core";
import { TenantEntity } from "../entities/Tenant";
import { Injectable, Scope } from "@nestjs/common";

@Injectable()
export class TenantService {
	constructor(
		private readonly orm: MikroORM,
		private readonly em: EntityManager,
	) {}

	async tenants(id?: number, email?: string) {
		console.log("id", id);
		const tenants = await this.em.find<TenantEntity>(
			TenantEntity,
			{
				rels: {
					user_id: id,
				},
			},
			{
				populate: ["rels"],
				populateWhere: PopulateHint.INFER,
			},
		);
		return tenants;
	}
}
