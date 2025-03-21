import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import FormData from "form-data";
import got from "got";
import { PassThrough } from "node:stream";

@Injectable()
export class LangFlowService {
	private endpoint = process.env.LANGFLOW_URL || "http://10.199.20.10:7862";
	private langflowApiKey =
		process.env.LANGFLOW_API_KEY ||
		"sk-T25yuKcW57Yr3_oehpknZhiFURVlwmSgiiC4RKsy8Ww";
	private authorization =
		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZWU3ZGU1OS1hZWZhLTQzNGItYjhiMy03YTkxMWFlZjJkODciLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY5NjA1NTM1fQ.JvS26u_1-R4NWieeKGWshIaNFfFaxA8CNxcdt3GhMYM";
	// private authorization =
	// 	"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZmQ0ZTkwNS1kODc1LTQwZjEtODdmNS0xM2NiYWRlNjY4M2YiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY4NTU0MzM5fQ.hdWCV_FBjKPvbqBL6HB1IKrVbq1y2wtI0hVvKuDEAmQ";

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
						// "x-api-key": "sk-nJL5Mhq1M0_5_Y-pVCAZwQFtU6aM7fu5UbkOiBPW5ec",
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

			await new Promise((resolve, reject) => {
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
	}): Promise<{
		id?: number;
		message?: string;
		fragments?: any[];
		created_at?: Date;
	}> {
		console.log(
			"RUN FLOW",
			`${this.endpoint}/api/v1/run/${flowId}?stream=false`,
			JSON.stringify({
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": this.langflowApiKey,
					// "x-api-key": "sk-nJL5Mhq1M0_5_Y-pVCAZwQFtU6aM7fu5UbkOiBPW5ec",
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

		const langflowResponse: any = await got.post(
			`${this.endpoint}/api/v1/run/${flowId}?stream=false`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": this.langflowApiKey,
					// "x-api-key": "sk-nJL5Mhq1M0_5_Y-pVCAZwQFtU6aM7fu5UbkOiBPW5ec",
				},
				json: {
					input_value: payload.message,
					output_type: "chat",
					input_type: "chat",
					tweaks: payload.tweaks,
				},
				responseType: "json",
				resolveBodyOnly: true,
			},
		);

		console.log("langflow response achived", method, langflowResponse);

		if (method === "UPLOAD") {
			return;
		}

		const results = langflowResponse.outputs[0].outputs[0].results;

		const response = {
			message: results.message.text,
			fragments: results.output,
			created_at: new Date(),
		};

		return response;
	}

	async getFlow({ filter } = { filter: "UPLOAD" }) {
		const { id: layoutFolderId } = (
			await got.get<any[]>(`${this.endpoint}/api/v1/folders/`, {
				headers: {
					"x-api-key": this.langflowApiKey,
				},
				responseType: "json",
				resolveBodyOnly: true,
			})
		).find((folder) => folder.name === "LAYOUTS");

		const flow = (
			await got.get<any[]>(`${this.endpoint}/api/v1/flows/`, {
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

		return newFlow as any;
	}

	async deleteFlow({ flow }) {
		await got.delete(`${this.endpoint}/api/v1/flows/${flow.id}`, {
			headers: {
				"x-api-key": this.langflowApiKey,
			},
		});
	}
}
