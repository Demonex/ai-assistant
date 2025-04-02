import { Injectable } from "@nestjs/common";
import FormData from "form-data";
import got from "got";

type Fragment = {
	file_path: string;
	page_num: number;
	text: string;
	uuid: string;
	_collection_name: string;
	_id: string;
};

type FlowResponse = {
	id?: number;
	message?: string;
	fragments?: Fragment[];
	created_at?: Date;
};

type Folder = {
	id: string;
	name: string;
};

type Flow = {
	id: string;
	name: string;
	folder_id: string;
	data: unknown;
};

@Injectable()
export class LangFlowService {
	private endpoint = process.env.LANGFLOW_URL;
	private langflowApiKey = process.env.LANGFLOW_API_KEY;

	async uploadFile({
		flowId,
		media,
		stream,
		name,
	}: {
		flowId?;
		media?;
		stream?;
		name?;
	}) {
		if (media) {
			const form = new FormData();
			form.append("file", media.buffer, media.originalname);

			const res = got.post<{ flowId: string; file_path: string }>(
				`${this.endpoint}/api/v1/files/upload/${flowId}`,
				{
					method: "POST",
					body: form,
					headers: {
						"x-api-key": this.langflowApiKey,
					},
					responseType: "json",
					resolveBodyOnly: true,
				},
			);
			console.log("res", res);
			return res;
		}

		if (stream) {
			const formData = new FormData();
			const bufs = [];

			await new Promise((resolve) => {
				stream.on("data", (d) => {
					bufs.push(d);
				});
				stream.on("end", async () => {
					formData.append("file", Buffer.concat(bufs), {
						filename: name,
						contentType: "application/pdf",
					});
					resolve(true);
				});
			});

			try {
				return await got.post(
					`${this.endpoint}/api/v1/files/upload/${flowId}`,
					{
						body: formData,
						headers: {
							"x-api-key": this.langflowApiKey,
							...formData.getHeaders(),
						},
						responseType: "json",
						resolveBodyOnly: true,
					},
				);
			} catch (error) {
				console.error("Request failed1:", error.message);
				console.error("Status code1:", error.response?.statusCode);
				console.error("Response body1:", error.response?.body);
				console.error("Headers1:", error.response?.headers);
			}
		}
	}

	async runFlow({
		flowId,
		payload,
		method = "RETRIEVE",
	}: {
		flowId: string;
		payload?: { [key: string]: unknown };
		method?: "RETRIEVE" | "UPLOAD";
	}): Promise<FlowResponse> {
		console.log(
			"RUN FLOW",
			`${this.endpoint}/api/v1/run/${flowId}?stream=false`,
			JSON.stringify({
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": this.langflowApiKey,
				},
				json: {
					input_value: payload.message,
					output_type: "chat",
					input_type: "chat",
					tweaks: payload.tweaks,
				},
				responseType: "json",
				resolveBodyOnly: true,
			}),
		);

		const langflowResponse = await got.post<{
			outputs: Array<{
				outputs: Array<{
					results: { message: { text: string }; output: Fragment[] };
				}>;
			}>;
		}>(`${this.endpoint}/api/v1/run/${flowId}?stream=false`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": this.langflowApiKey,
			},
			json: {
				input_value: payload.message,
				output_type: "chat",
				input_type: "chat",
				tweaks: payload.tweaks,
			},
			responseType: "json",
			resolveBodyOnly: true,
		});

		console.log("langflow response achived", method, langflowResponse);

		if (method === "UPLOAD") {
			return;
		}

		const results = langflowResponse.outputs[0].outputs[0].results;

		const response: FlowResponse = {
			message: results.message.text,
			fragments: results.output,
			created_at: new Date(),
		};

		return response;
	}

	async getFlow({ filter } = { filter: "UPLOAD" }) {
		const { id: layoutFolderId } = (
			await got.get<Folder[]>(`${this.endpoint}/api/v1/folders/`, {
				headers: {
					"x-api-key": this.langflowApiKey,
				},
				responseType: "json",
				resolveBodyOnly: true,
			})
		).find((folder) => folder.name === "LAYOUTS");

		const flow = (
			await got.get<Flow[]>(`${this.endpoint}/api/v1/flows/`, {
				headers: {
					"x-api-key": this.langflowApiKey,
				},
				responseType: "json",
				resolveBodyOnly: true,
			})
		).find((flow) => flow.folder_id === layoutFolderId && flow.name === filter);

		return flow;
	}

	async createFlow({ flow }) {
		const newFlow = await got.post(`${this.endpoint}/api/v1/flows/`, {
			json: {
				name: `${Date.now().toString()}-${flow.name}`,
				data: flow.data,
			},
			headers: {
				"x-api-key": this.langflowApiKey,
			},
			responseType: "json",
			resolveBodyOnly: true,
		});

		return newFlow;
	}

	async deleteFlow({ flow }) {
		await got.delete(`${this.endpoint}/api/v1/flows/${flow.id}`, {
			headers: {
				"x-api-key": this.langflowApiKey,
			},
		});
	}
}
