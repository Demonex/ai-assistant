import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { ProviderEntity } from "../entities/Provider/index.js";

@Injectable()
export class ProviderService {
	constructor(private readonly em: EntityManager) {}

	async getProviders() {
		const providers = await this.em.find<ProviderEntity>(ProviderEntity, {});
		return providers;
	}
}
