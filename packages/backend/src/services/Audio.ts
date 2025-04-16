import { Injectable } from "@nestjs/common";
import got from "got";

import FormData from "form-data";
import type { AudioReponse, AudioTranscription } from "../types/Audio.js";
import type { UploadedFile } from "../types/Chat.js";

@Injectable()
export class AudioService {
	private endpoint = process.env.AUDIO_SERVICE_URL;

	async transcribe(media: UploadedFile): Promise<AudioReponse> {
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
			transcription: response.transcription,
			fullText: response.summary.full_text,
			status: response.summary.status,
		};
	}
}
