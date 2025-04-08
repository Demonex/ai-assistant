import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import got from "got";

import FormData from "form-data";
import type { UploadedFile } from "../types/Chat.js";
import { logErrors } from "../utils/index.js";

@Injectable()
export class GotenbergService {
	private endpoint = process.env.GOTENBERG_API_URL;
	private authorization = `Basic ${Buffer.from(
		`${process.env.GOTENBERG_API_BASIC_AUTH_USERNAME}:${process.env.GOTENBERG_API_BASIC_AUTH_PASSWORD}`,
		"utf-8",
	).toString("base64")}`;

	async convert(media: UploadedFile) {
		try {
			// const passThrough1 = new PassThrough();
			// const passThrough2 = new PassThrough();

			// const pdfKey = key.replace(/\.[^/.]+$/, ".pdf");

			// const { endpoint, ...rest } = params.getStorageClient();
			// const bucket = params.bucket;

			// const s3Client = new S3Client({
			// 	endpoint,
			// 	...rest,
			// });

			// const downloadFromPayload = JSON.stringify([
			// 	{
			// 		url: `${params.dockerEndpoint || endpoint}/${bucket}/${key}`,
			// 	},
			// ]);

			// const encodedFileName = encodeURIComponent(pdfKey)
			// 	.replace(/'/g, "%27")
			// 	.replace(/\(/g, "%28")
			// 	.replace(/\)/g, "%29");

			// const upload = new Upload({
			// 	client: s3Client,
			// 	params: {
			// 		Bucket: bucket,
			// 		Key: Buffer.from(pdfKey, "utf-8").toString(),
			// 		Body: passThrough1,
			// 		ContentDisposition: `inline; filename*=UTF-8''${encodedFileName}`,
			// 		ContentType: "application/pdf",
			// 	},
			// 	queueSize: 4,
			// 	partSize: 5 * 1024 * 1024,
			// });

			const form = new FormData();
			form.append("file", media.buffer, media.originalname);

			const pdfFile = got.post<UploadedFile>(
				`${this.endpoint}/forms/libreoffice/convert`,
				{
					body: form,
					headers: {
						authorization: this.authorization,
						...form.getHeaders(),
					},
					resolveBodyOnly: true,
				},
			);

			// pdfReponse.pipe(passThrough1);
			// pdfReponse.pipe(passThrough2);

			// upload.on("httpUploadProgress", (progress) => {
			// 	console.log(
			// 		`Uploaded ${progress.loaded} bytes out of ${progress.total}`,
			// 	);
			// });

			// try {
			// 	const data = upload.done();
			// 	console.log("Upload successful:", data);
			// } catch (err) {
			// 	console.error("Error uploading file:", err);
			// }

			return pdfFile;
		} catch (error) {
			logErrors(error);

			throw new HttpException(
				"Convert Pipeline Failed",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
