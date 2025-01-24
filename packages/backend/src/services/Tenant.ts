import { EntityManager, PopulateHint } from "@mikro-orm/core";
import { TenantEntity } from "../entities/Tenant/index.js";
import { Injectable, Scope } from "@nestjs/common";

@Injectable()
export class TenantService {
	constructor(private readonly em: EntityManager) {}

	async tenants(id?: number) {
		const tenants = await this.em.findAll<TenantEntity>(TenantEntity);
		return tenants;
	}
}
