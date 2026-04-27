import { Injectable } from "@nestjs/common";
import { Agent } from "https";
import got from "got";
import FormData from "form-data";

interface FileData {
	buffer: Buffer;
	originalname: string;
}

//TODO отрефакторить код
@Injectable()
export class DocService {
	private endpoint = process.env.COMPARISON_API_URL;
	private comparisonApiKey = process.env.COMPARISON_API_KEY;
	private httpsAgent: Agent;

	constructor() {
		const certContent = Buffer.from(
			process.env.COMPARISON_CONTENT!,
			"base64",
		).toString();

		const kaspContent = Buffer.from(
			process.env.KASPERSKY_CONTENT!,
			"base64",
		).toString();

		this.httpsAgent = new Agent({
			ca: [certContent, kaspContent],
			rejectUnauthorized: true,
		});
	}

	async comporisonDoc(files: FileData[]) {
		const formData = new FormData();

		files.forEach((file: FileData) => {
			formData.append("files", file.buffer, file.originalname);
		});

		try {
			const response = await got.post(this.endpoint, {
				headers: {
					"x-api-key": this.comparisonApiKey,
					...formData.getHeaders(),
				},
				agent: { https: this.httpsAgent },
				body: formData,
				resolveBodyOnly: true,
				responseType: "json",
			});
			return response;
		} catch (error) {
			throw new Error(`Failed to compare documants: ${error.message}`);
		}
	}
}
