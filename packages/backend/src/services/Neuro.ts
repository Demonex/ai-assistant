import { Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/core";
import { NeuroEntity } from "../entities/Neuro/index.js";

@Injectable()
export class NeuroService {
	constructor(private readonly em: EntityManager) {}

	async getNeuro() {
		const neuro = await this.em.find<NeuroEntity>(NeuroEntity, {});
		return neuro;
	}
}
