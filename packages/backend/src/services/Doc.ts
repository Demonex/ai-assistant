import { Injectable } from "@nestjs/common";
import { Agent } from "https";
import got from "got";
import FormData from "form-data";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

interface FileData {
	buffer: Buffer;
	originalname: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Injectable()
export class DocService {
	private endpoint = process.env.COMPARISON_API_URL;
	private comparisonApiKey = process.env.COMPARISON_API_KEY;
	private httpsAgent: Agent;

	constructor() {
		const certPath = resolve(
			__dirname,
			"../../src/certs/spb-ai01.sigma-it.local.pem",
		);
		const kaspPath = resolve(__dirname, "../../src/certs/Kaspersky.pem");

		const certContent = readFileSync(certPath);
		const kaspContent = readFileSync(kaspPath);

		this.httpsAgent = new Agent({
			ca: [certContent, kaspContent],
			rejectUnauthorized: true,
		});
	}

	async setupCertificates() {}

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
