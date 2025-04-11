import { Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/core";
import { TenantEntity } from "../entities/Tenant/index.js";

@Injectable()
export class TenantService {
	constructor(private readonly em: EntityManager) {}

	async getTenants() {
		const tenants = await this.em.find<TenantEntity>(TenantEntity, {});
		return tenants;
	}
}
