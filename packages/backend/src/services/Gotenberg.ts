import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import FormData from "form-data";
import got from "got";

@Injectable()
export class GotenbergService {
	private endpoint = "http://localhost:3000";
	// private endpoint = "http://10.199.20.10:7862";
	private authorization =
		`Basic ${Buffer.from("root:root123", "utf-8").toString("base64")}`;
	// private authorization =
	// 	"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZmQ0ZTkwNS1kODc1LTQwZjEtODdmNS0xM2NiYWRlNjY4M2YiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY4NTU0MzM5fQ.hdWCV_FBjKPvbqBL6HB1IKrVbq1y2wtI0hVvKuDEAmQ";

	async convertFromS3({ media }) {
		const form = new FormData();
		form.append("files", media.buffer, media.originalname);

		return got.post(`${this.endpoint}/forms/libreoffice/convert`, {
			method: "POST",
			body: form,
			headers: {
				authorization: this.authorization,
			},
			resolveBodyOnly: true,
		});
	}

	// async runFlow({
	// 	flowId,
	// 	payload,
	// }: { flowId: string; payload?: { [key: string]: unknown } }) {
	// 	const result: any = await got.post(
	// 		`${this.endpoint}/api/v1/run/${flowId}?stream=false`,
	// 		{
	// 			method: "POST",
	// 			headers: {
	// 				// Authorization: this.authorization,
	// 				"Content-Type": "application/json",
	// 				"x-api-key": "sk-nJL5Mhq1M0_5_Y-pVCAZwQFtU6aM7fu5UbkOiBPW5ec",
	// 			},
	// 			body: JSON.stringify({
	// 				input_value: payload.message,
	// 				output_type: "chat",
	// 				input_type: "chat",
	// 				tweaks: payload.tweaks,
	// 			}),
	// 			responseType: "json",
	// 			resolveBodyOnly: true,
	// 		},
	// 	);

	// 	return result.outputs[0].outputs[0]?.results.message.text;
	// }
}
