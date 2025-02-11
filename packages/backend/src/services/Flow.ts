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
					// authorization: this.authorization,
					"x-api-key": "sk-nJL5Mhq1M0_5_Y-pVCAZwQFtU6aM7fu5UbkOiBPW5ec",
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
		const result: any = await got.post(
			`${this.endpoint}/api/v1/run/${flowId}?stream=false`,
			{
				method: "POST",
				headers: {
					// Authorization: this.authorization,
					"Content-Type": "application/json",
					"x-api-key": "sk-nJL5Mhq1M0_5_Y-pVCAZwQFtU6aM7fu5UbkOiBPW5ec",
				},
				body: JSON.stringify({
					input_value: payload.message,
					output_type: "chat",
					input_type: "chat",
					tweaks: payload.tweaks,
				}),
				responseType: "json",
				resolveBodyOnly: true,
			},
		);

		return result.outputs[0].outputs[0]?.results.message.text;
	}
}
