import { EntityManager, MikroORM } from "@mikro-orm/core";
import { InjectRedis } from "@nestjs-modules/ioredis";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ChatMessageEntity } from "@repo/backend/entities/Chat/index.js";
import type { Redis } from "ioredis";
import type { ChatMessageDto } from "../dto/Chat.js";
import { CollectionEntity } from "../entities/Collection/index.js";
import { PROVIDER_TYPE } from "../entities/Provider/index.js";
import { getHandleUpload } from "../utils/handleUpload.js";
import { promiseMap } from "../utils/index.js";
import got from "got";
import FormData from "form-data";
import type { RequestFlowConfig } from "../types/RequestFlowConfig.js";

@Injectable()
export class LangFlowService {
	private config: RequestFlowConfig;

	async getConfig() {
		this.config =
			this.config ||
			(await got.get<RequestFlowConfig>(
				"http://10.199.20.10:7860/api/v1/flows/2fdcf711-a6eb-43c6-8a41-291e45c8b2a1",
				{
					headers: {
						authorization:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZmQ0ZTkwNS1kODc1LTQwZjEtODdmNS0xM2NiYWRlNjY4M2YiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY4NTU0MzM5fQ.hdWCV_FBjKPvbqBL6HB1IKrVbq1y2wtI0hVvKuDEAmQ",
					},
					responseType: "json",
					resolveBodyOnly: true,
				},
			));

		return this.config;
	}

	async updateConfigFile({ file_path, nodeId = "File-9WG0R" }) {
		const config = await this.getConfig();
		const node = config.data.nodes.find(({ id }) => id === nodeId);
		if (!node) {
			throw new HttpException("1", HttpStatus.BAD_REQUEST);
		}
		node.data.node.template.path.file_path = file_path;
		this.config = config;

		return got.patch(
			"http://10.199.20.10:7860/api/v1/flows/2fdcf711-a6eb-43c6-8a41-291e45c8b2a1",
			{
				json: config,
				headers: {
					authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZmQ0ZTkwNS1kODc1LTQwZjEtODdmNS0xM2NiYWRlNjY4M2YiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY4NTU0MzM5fQ.hdWCV_FBjKPvbqBL6HB1IKrVbq1y2wtI0hVvKuDEAmQ",
				},
				responseType: "json",
				resolveBodyOnly: true,
			},
		);
	}

	async uploadFile(media) {
		const form = new FormData();
		form.append("file", media.buffer, media.originalname);

		return got.post<{ flowId: string; file_path: string }>(
			"http://10.199.20.10:7860/api/v1/files/upload/2fdcf711-a6eb-43c6-8a41-291e45c8b2a1",
			{
				method: "POST",
				body: form,
				headers: {
					authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZmQ0ZTkwNS1kODc1LTQwZjEtODdmNS0xM2NiYWRlNjY4M2YiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY4NTU0MzM5fQ.hdWCV_FBjKPvbqBL6HB1IKrVbq1y2wtI0hVvKuDEAmQ",
				},
				responseType: "json",
				resolveBodyOnly: true,
			},
		);
	}
}
