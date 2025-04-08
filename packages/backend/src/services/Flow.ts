import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import FormData from "form-data";
import got from "got";
import type { UploadedFile } from "../types/Chat.js";
import type { Flow, FlowResponse, Folder, Fragment } from "../types/FLow.js";
import { logErrors } from "../utils/index.js";

@Injectable()
export class LangFlowService {
	private endpoint = process.env.LANGFLOW_URL;
	private langflowApiKey = process.env.LANGFLOW_API_KEY;

	async uploadFile({
		flowId,
		media,
	}: {
		flowId: Flow["id"];
		filename: string;
		media?: UploadedFile;
	}) {
		try {
			const form = new FormData();
			form.append("file", media.buffer, media.originalname);

			return got.post<{ flowId: string; file_path: string }>(
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
		} catch (error) {
			logErrors(error);

			throw new HttpException(
				"Upload Pipeline Failed",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async runFlow({
		flowId,
		payload,
		action = "RETRIEVE",
	}: {
		flowId: string;
		payload?: { [key: string]: unknown };
		action?: "RETRIEVE" | "UPLOAD";
	}): Promise<FlowResponse> {
		try {
			const langflowResponse = await got.post<{
				outputs: Array<{
					outputs: Array<{
						results: { message: { text: string }; output: Fragment[] };
					}>;
				}>;
			}>(`${this.endpoint}/api/v1/run/${flowId}?stream=false`, {
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

			if (action === "UPLOAD") {
				return;
			}

			const results = langflowResponse.outputs[0].outputs[0].results;

			const response: FlowResponse = {
				message: results.message.text,
				fragments: results.output,
				created_at: new Date(),
			};

			return response;
		} catch (error) {
			logErrors(error);

			throw new HttpException(
				"Run Pipeline Failed",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getFlow({
		action = "UPLOAD",
	}: { action?: "UPLOAD" | "RETRIEVE" } = {}) {
		try {
			const { id: folderId } = (
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
			).find((flow) => flow.folder_id === folderId && flow.name === action);

			return flow;
		} catch (error) {
			logErrors(error);

			throw new HttpException(
				"Get Pipeline Failed",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async copyFlow(flow: Flow) {
		try {
			const newFlow = await got.post<Flow>(`${this.endpoint}/api/v1/flows/`, {
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
		} catch (error) {
			logErrors(error);

			throw new HttpException(
				"Copy Pipeline Failed",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async deleteFlow(flow: Flow) {
		try {
			await got.delete(`${this.endpoint}/api/v1/flows/${flow.id}`, {
				headers: {
					"x-api-key": this.langflowApiKey,
				},
			});
		} catch (error) {
			logErrors(error);

			throw new HttpException(
				"Delete Pipeline Failed",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
