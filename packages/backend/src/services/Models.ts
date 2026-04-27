import { Injectable, NotFoundException } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/core";
import { ModelEntity } from "../entities/Model/index.js";
import type { CreateModelDto, UpdateModelDto } from "../dto/Model.js";
import { TenantEntity } from "../entities/Tenant/index.js";

@Injectable()
export class ModelService {
	constructor(private readonly em: EntityManager) {}

	async getModels() {
		const models = await this.em.find<ModelEntity>(ModelEntity, {});

		if (!models) throw new NotFoundException("Neuro does not exist");

		return models;
	}

	async getModel(id: number) {
		return await this.em.findOne<ModelEntity>(
			ModelEntity,
			{ id },
			{
				populate: ["tenant"],
			},
		);
	}

	async createModel(createModelDto: CreateModelDto) {
		const tenant = await this.em.findOne<TenantEntity>(TenantEntity, {
			title: createModelDto.tenant,
		});

		if (!tenant)
			throw new NotFoundException(
				`ModelEntity ith title "${createModelDto.tenant}" not found`,
			);

		const model = this.em.create(ModelEntity, {
			title: createModelDto.title,
			type: createModelDto.type,
			tenant,
		});

		await this.em.persistAndFlush(model);

		return model;
	}

	async updateModel(id: number, updateModelDto: UpdateModelDto) {
		const model = await this.em.findOne<ModelEntity>(ModelEntity, { id });

		if (!model) throw new NotFoundException("Model not found");

		for (const key of Object.keys(updateModelDto)) {
			const value = updateModelDto[key];

			if (value === undefined) continue;

			if (key === "tenant") {
				const tenant = await this.em.findOne<TenantEntity>(TenantEntity, {
					title: value,
				});

				if (!tenant) throw new NotFoundException("Tenant not found");

				model.tenant = tenant;
			} else {
				model[key] = value;
			}
		}

		await this.em.flush();

		return model;
	}
}
