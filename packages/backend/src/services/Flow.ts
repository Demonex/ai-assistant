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
	private endpoint = "http://10.199.20.10:7860";
	private flowId = "2fdcf711-a6eb-43c6-8a41-291e45c8b2a1";
	private authorization =
		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZmQ0ZTkwNS1kODc1LTQwZjEtODdmNS0xM2NiYWRlNjY4M2YiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY4NTU0MzM5fQ.hdWCV_FBjKPvbqBL6HB1IKrVbq1y2wtI0hVvKuDEAmQ";

	async getConfig() {
		return got.get<RequestFlowConfig>(
			`${this.endpoint}/api/v1/flows/${this.flowId}`,
			{
				headers: {
					authorization: this.authorization,
				},
				responseType: "json",
				resolveBodyOnly: true,
			},
		);
	}

	async updateConfigFile({ file_path, nodeId, originalname }) {
		const config = await this.getConfig();
		const node = config.data.nodes.find(({ id }) => id === nodeId);
		if (!node) {
			throw new HttpException("Node Not Found", HttpStatus.BAD_REQUEST);
		}
		node.data.node.template.path.file_path = file_path;
		node.data.node.template.path.value = originalname;

		return got.patch(`${this.endpoint}/api/v1/flows/${this.flowId}`, {
			json: config,
			headers: {
				authorization: this.authorization,
			},
			responseType: "json",
			resolveBodyOnly: true,
		});
	}

	async uploadFile(media) {
		const form = new FormData();
		form.append("file", media.buffer, media.originalname);

		return got.post<{ flowId: string; file_path: string }>(
			`${this.endpoint}/api/v1/files/upload/${this.flowId}`,
			{
				method: "POST",
				body: form,
				headers: {
					authorization: this.authorization,
				},
				responseType: "json",
				resolveBodyOnly: true,
			},
		);
	}

	async buildFlow({ stop_component_id }) {
		const {
			data: { edges, nodes },
		} = await this.getConfig();
		const response: {
			event: string;
			data: {
				build_data?: { id: string; valid: boolean; [k: string]: any };
				[k: string]: unknown;
			};
		}[] = (
			await got.post(`${this.endpoint}/api/v1/build/${this.flowId}/flow`, {
				searchParams: {
					stop_component_id,
					log_builds: true,
				},
				json: {
					edges,
					nodes,
				},
				headers: {
					authorization: this.authorization,
				},
				responseType: "text",
				resolveBodyOnly: true,
			})
		)
			.split("\n")
			.reduce((result, line) => {
				if (line === "") {
					return result;
				}
				result.push(JSON.parse(line));
				return result;
			}, []);
		const buildNode = response.find(({ event, data }) => {
			return (
				event === "end_vertex" && data.build_data?.id === stop_component_id
			);
		});
		if (!buildNode.data.build_data.valid) {
			throw new HttpException("Build flow node faild", HttpStatus.BAD_REQUEST);
		}
		console.log("buildNode", buildNode);
		return response;
	}

	async updateConfigChatInput({ value, nodeId }) {
		const config = await this.getConfig();
		const node = config.data.nodes.find(({ id }) => id === nodeId);
		if (!node) {
			throw new HttpException("Node Not Found", HttpStatus.BAD_REQUEST);
		}
		node.data.node.template.input_value.value = value;

		return got.patch(`${this.endpoint}/api/v1/flows/${this.flowId}`, {
			json: config,
			headers: {
				authorization: this.authorization,
			},
			responseType: "json",
			resolveBodyOnly: true,
		});
	}
}
