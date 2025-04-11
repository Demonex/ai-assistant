import { Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/core";
import { ModelEntity } from "../entities/Model/index.js";

@Injectable()
export class ModelService {
	constructor(private readonly em: EntityManager) {}

	async getModels() {
		const models = await this.em.find<ModelEntity>(ModelEntity, {});
		return models;
	}
}
