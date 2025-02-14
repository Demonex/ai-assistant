import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import FormData from "form-data";
import got from "got";

@Injectable()
export class LangFlowService {
	private endpoint = "http://10.199.20.10:7862";
	private authorization =
		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZWU3ZGU1OS1hZWZhLTQzNGItYjhiMy03YTkxMWFlZjJkODciLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY5NjA1NTM1fQ.JvS26u_1-R4NWieeKGWshIaNFfFaxA8CNxcdt3GhMYM";
	// private authorization =
	// 	"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZmQ0ZTkwNS1kODc1LTQwZjEtODdmNS0xM2NiYWRlNjY4M2YiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY4NTU0MzM5fQ.hdWCV_FBjKPvbqBL6HB1IKrVbq1y2wtI0hVvKuDEAmQ";

	async uploadFile({ flowId, media }) {
		const form = new FormData();
		form.append("file", media.buffer, media.originalname);

		return got.post<{ flowId: string; file_path: string }>(
			`${this.endpoint}/api/v1/files/upload/${flowId}`,
			{
				method: "POST",
				body: form,
				headers: {
					"x-api-key": "sk-T25yuKcW57Yr3_oehpknZhiFURVlwmSgiiC4RKsy8Ww",
					// "x-api-key": "sk-nJL5Mhq1M0_5_Y-pVCAZwQFtU6aM7fu5UbkOiBPW5ec",
				},
				responseType: "json",
				resolveBodyOnly: true,
			},
		);
	}

	async runFlow({
		flowId,
		payload,
	}: { flowId: string; payload?: { [key: string]: unknown } }) {
		console.log(flowId, `${this.endpoint}/api/v1/run/${flowId}?stream=false`);

		const result: any = await got.post(
			`${this.endpoint}/api/v1/run/${flowId}?stream=false`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": "sk-T25yuKcW57Yr3_oehpknZhiFURVlwmSgiiC4RKsy8Ww",
					// "x-api-key": "sk-nJL5Mhq1M0_5_Y-pVCAZwQFtU6aM7fu5UbkOiBPW5ec",
				},
				json: {
					input_value: payload.message,
					output_type: "text",
					input_type: "chat",
					tweaks: payload.tweaks,
				},
				responseType: "json",
				resolveBodyOnly: true,
			},
		);

		console.log(JSON.stringify(result));

		return result;
	}

	async getFlow({ filter } = { filter: "UPLOAD" }) {
		const { id: layoutFolderId } = (
			await got.get<any[]>(`${this.endpoint}/api/v1/folders/`, {
				headers: {
					"x-api-key": "sk-T25yuKcW57Yr3_oehpknZhiFURVlwmSgiiC4RKsy8Ww",
				},
				responseType: "json",
				resolveBodyOnly: true,
			})
		).find((folder) => folder.name === "LAYOUTS");

		const flow = (
			await got.get<any[]>(`${this.endpoint}/api/v1/flows/`, {
				headers: {
					"x-api-key": "sk-T25yuKcW57Yr3_oehpknZhiFURVlwmSgiiC4RKsy8Ww",
				},
				responseType: "json",
				resolveBodyOnly: true,
			})
		).find((flow) => flow.folder_id === layoutFolderId && flow.name === filter);
		console.log(flow, "OLD FLOW");

		return flow;
	}

	async createFlow({ flow }) {
		const newFlow = await got.post(`${this.endpoint}/api/v1/flows/`, {
			json: {
				name: `${Date.now().toString()}-${flow.name}`,
				data: flow.data,
			},
			headers: {
				"x-api-key": "sk-T25yuKcW57Yr3_oehpknZhiFURVlwmSgiiC4RKsy8Ww",
			},
			responseType: "json",
			resolveBodyOnly: true,
		});
		console.log(newFlow, "NEW FLOW");

		return newFlow as any;
	}

	async deleteFlow({ flow }) {
		console.log(flow.id);

		await got.delete(`${this.endpoint}/api/v1/flows/${flow.id}`, {
			headers: {
				"x-api-key": "sk-T25yuKcW57Yr3_oehpknZhiFURVlwmSgiiC4RKsy8Ww",
			},
		});
	}
}
