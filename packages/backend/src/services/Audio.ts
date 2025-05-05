import { Injectable } from "@nestjs/common";
import got from "got";

import FormData from "form-data";
import type { AudioUploadMediaDto } from "../dto/Audio.js";
import type { AudioReponse, AudioTranscription } from "../types/Audio.js";
import type { UploadedFile } from "../types/Chat.js";
import { logErrors, promiseMap } from "../utils/index.js";

@Injectable()
export class AudioService {
	private endpoint = process.env.AUDIO_SERVICE_URL;

	async transcribe(data: AudioUploadMediaDto) {
		const audioFormats = [
			"video/mp4",
			"video/webm",
			"audio/x-wav",
			"audio/mpeg",
			"audio/x-m4a",
			"audio/ogg",
		];

		const uploadData = await promiseMap<
			| {
					type: "audio";
					file: string;
					transciption?: AudioReponse["transcription"];
					fullText?: AudioReponse["fullText"];
					status: "success" | "errors";
					message?: string;
			  }
			| {
					type: "unsupported";
					status: "errors";
					message: string;
			  },
			UploadedFile
		>(data.media, async (media) => {
			try {
				if (audioFormats.includes(media.mimetype)) {
					const form = new FormData();
					form.append("file", media.buffer, media.originalname);

					const response = await got.post<AudioTranscription>(
						`${this.endpoint}/transcribe`,
						{
							body: form,
							headers: {
								...form.getHeaders(),
							},
							resolveBodyOnly: true,
							responseType: "json",
						},
					);

					return {
						type: "audio",
						file: media.originalname,
						transciption: response.transcription,
						fullText: response.summary.full_text,
						status: response.summary.status === "OK" ? "success" : "errors",
					};
				}
			} catch (error) {
				logErrors(error);

				return {
					type: "audio",
					file: media.originalname,
					status: "errors",
					message: error.response?.body.detail,
				};
			}

			return {
				type: "unsupported",
				status: "errors",
				message: "Unsupported Type",
			};
		});

		type AudioResult = {
			success?: {
				type: "audio";
				file: string;
				transciption?: AudioReponse["transcription"];
				fullText?: AudioReponse["fullText"];
				status: "success" | "errors";
				message?: string;
			}[];
			errors?: {
				type: "unsupported";
				status: "errors";
				message: string;
			};
		};

		const audioResult: AudioResult = uploadData.reduce((acc, item) => {
			const { status } = item;

			if (!acc[status]) {
				acc[status] = [];
			}

			acc[status].push(item);

			return acc;
		}, {});

		return audioResult;
	}
}
