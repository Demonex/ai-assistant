import { Injectable, NotFoundException } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/core";
import { NeuroEntity } from "../entities/Neuro/index.js";
import { CreateNeuroDto, UpdateNeuroDto } from "../dto/Neuro.js";
import { ModelEntity } from "../entities/Model/index.js";

@Injectable()
export class NeuroService {
	constructor(private readonly em: EntityManager) {}

	async getNeuro() {
		const neuro = await this.em.find<NeuroEntity>(
			NeuroEntity,
			{},
			{ populate: ["model"] as const },
		);

		if (!neuro) throw new NotFoundException("Neuro does not exist");

		return neuro;
	}

	async getNeuroById(id: number) {
		const neuro = await this.em.findOne<NeuroEntity>(
			NeuroEntity,
			{ id },
			{
				populate: ["model"],
			},
		);
		if (!neuro)
			throw new NotFoundException(`Neuro witd id:${id} does not exist`);
		return neuro;
	}

	async createNeuro(createNeuroDto: CreateNeuroDto) {
		const model = await this.em.findOne<ModelEntity>(ModelEntity, {
			title: createNeuroDto.model,
		});

		if (!model)
			throw new NotFoundException(
				`ModelEntity ith title "${createNeuroDto.model}" not found`,
			);

		const neuro = this.em.create(NeuroEntity, {
			title: createNeuroDto.title,
			model: model,
			modelSettings: createNeuroDto.modelSettings,
		});
		await this.em.persistAndFlush(neuro);

		return neuro;
	}

	async updateNeuro(id: number, updateNeuroDto: UpdateNeuroDto) {
		const neuro = await this.em.findOneOrFail<NeuroEntity>(NeuroEntity, { id });

		for (const key of Object.keys(updateNeuroDto)) {
			const value = updateNeuroDto[key];

			if (value === undefined) continue;

			if (key === "model") {
				const model = await this.em.findOneOrFail(ModelEntity, {
					title: value,
				});
				neuro.model = model;
			} else {
				neuro[key] = value;
			}
		}

		await this.em.flush();
		return neuro;
	}
}
