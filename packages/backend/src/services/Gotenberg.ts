import * as AWS from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import got from "got";
import { promiseMap } from "../utils/index.js";

import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { PassThrough } from "node:stream";
import FormData from "form-data";
import { LangFlowService } from "./Flow.js";

@Injectable()
export class GotenbergService {
	// private endpoint = "http://localhost:3000";
	private endpoint =
		process.env.GOTENBERG_API_URL || "http://10.199.20.10:3000";
	private authorization =
		`Basic ${Buffer.from(`${process.env.GOTENBERG_API_BASIC_AUTH_USERNAME}:${process.env.GOTENBERG_API_BASIC_AUTH_PASSWORD}`, "utf-8").toString("base64")}`;
	// private authorization =
	// 	"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZmQ0ZTkwNS1kODc1LTQwZjEtODdmNS0xM2NiYWRlNjY4M2YiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY4NTU0MzM5fQ.hdWCV_FBjKPvbqBL6HB1IKrVbq1y2wtI0hVvKuDEAmQ";

	constructor(private readonly flowService: LangFlowService) {}

	async convertFromS3({
		flowId,
		fileKey: key,
		params,
	}): Promise<{ flowId: string; file_path: string }> {
		try {
			// console.log(downloadFromPayload);

			// await promiseMap(fileKey, async (key) => {
			const passThrough1 = new PassThrough();
			const passThrough2 = new PassThrough();

			const pdfKey = key.replace(/\.[^/.]+$/, ".pdf");

			const { endpoint, ...rest } = params.getStorageClient();
			const bucket = params.bucket;

			const s3Client = new S3Client({
				endpoint,
				...rest,
				// endpoint: params.dockerEndpoint || endpoint,
			});

			// const url = `${params.dockerEndpoint || endpoint}/${bucket}/${key}`
			// console.log( url )
			const downloadFromPayload = JSON.stringify([
				{
					url: `${params.dockerEndpoint || endpoint}/${bucket}/${key}`,
				},
			]);

			const encodedFileName = encodeURIComponent(pdfKey)
				.replace(/'/g, "%27")
				.replace(/\(/g, "%28")
				.replace(/\)/g, "%29");

			const upload = new Upload({
				client: s3Client,
				params: {
					Bucket: bucket,
					Key: Buffer.from(pdfKey, "utf-8").toString(),
					Body: passThrough1,
					ContentDisposition: `inline; filename*=UTF-8''${encodedFileName}`,
					ContentType: "application/pdf",
				},
				queueSize: 4,
				partSize: 5 * 1024 * 1024,
			});

			const form = new FormData();
			form.append("downloadFrom", downloadFromPayload);

			const pdfReponse = got.stream(
				`${this.endpoint}/forms/libreoffice/convert`,
				{
					method: "POST",
					body: form,
					headers: {
						authorization: this.authorization,
						...form.getHeaders(),
					},
				},
			);

			pdfReponse.pipe(passThrough1);
			pdfReponse.pipe(passThrough2);

			upload.on("httpUploadProgress", (progress) => {
				console.log(
					`Uploaded ${progress.loaded} bytes out of ${progress.total}`,
				);
			});

			try {
				const data = upload.done();
				console.log("Upload successful:", data);
			} catch (err) {
				console.error("Error uploading file:", err);
			}

			const result = await this.flowService.uploadFile({
				flowId,
				stream: passThrough2,
				name: pdfKey,
			});

			return result;

			// console.log("afterupload");
			// const formData = new FormData();
			// formData.append("file", passThrough2, {
			// 	filename: "uploaded-file.txt", // Set the file name
			// 	contentType: "text/plain", // Adjust based on file type
			// });

			// // Send the request using got
			// got.post("http://10.199.20.10:7862", {
			// 	body: formData,
			// 	headers: {
			// 		...formData.getHeaders(), // Include correct form-data headers
			// 	},
			// })
			// });
		} catch (err) {
			console.error(err);
		}
	}
}
