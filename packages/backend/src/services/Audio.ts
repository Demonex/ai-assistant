import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import got from "got";

import FormData from "form-data";
import type { UploadedFile } from "../types/Chat.js";
import { logErrors } from "../utils/index.js";

@Injectable()
export class AudioService {
	private endpoint = process.env.GOTENBERG_API_URL;
	private authorization = `Basic ${Buffer.from(
		`${process.env.GOTENBERG_API_BASIC_AUTH_USERNAME}:${process.env.GOTENBERG_API_BASIC_AUTH_PASSWORD}`,
		"utf-8",
	).toString("base64")}`;

	async convert(media: UploadedFile): Promise<UploadedFile> {
		try {
			const pdfKey = media.originalname.replace(/\.[^/.]+$/, ".pdf");

			const form = new FormData();
			form.append("files", media.buffer, pdfKey);

			const response = await got.post(
				`${this.endpoint}/forms/libreoffice/convert`,
				{
					body: form,
					headers: {
						authorization: this.authorization,
						...form.getHeaders(),
					},
					responseType: "buffer",
				},
			);

			const buffer = response.body;
			const mimetype = response.headers["content-type"];
			const size = response.body.length;

			return {
				buffer,
				mimetype,
				size,
				filename: pdfKey,
				originalname: pdfKey,
			};
		} catch (error) {
			logErrors(error);

			throw new HttpException(
				"Convert Pipeline Failed",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
