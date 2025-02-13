import * as AWS from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import got from "got";
import { promiseMap } from "../utils/index.js";

import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { PassThrough } from "node:stream";

@Injectable()
export class GotenbergService {
	private endpoint = "http://localhost:3000";
	// private endpoint = "http://10.199.20.10:7862";
	private authorization =
		`Basic ${Buffer.from("root:root123", "utf-8").toString("base64")}`;
	// private authorization =
	// 	"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZmQ0ZTkwNS1kODc1LTQwZjEtODdmNS0xM2NiYWRlNjY4M2YiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY4NTU0MzM5fQ.hdWCV_FBjKPvbqBL6HB1IKrVbq1y2wtI0hVvKuDEAmQ";

	async convertFromS3({ fileKeys, params }) {
		try {
			const downloadFromPayload = JSON.stringify(
				fileKeys.map((key) => ({
					url: key,
				})),
			);
			console.log(downloadFromPayload);

			await promiseMap(fileKeys, async (key) => {
				const passThroughStream = new PassThrough();
				// const pdfKey = key.replace(/(.*)$/, '.pdf')
				// const pdfKey = `${key.split('.')[0]}.pdf`
				// TODO add extention if there was none
				const pdfKey = key.replace(/\.[^/.]+$/, ".pdf");

				const { endpoint, ...rest } = params.getStorageClient();
				const bucket = params.bucket;

				const s3Client = new S3Client({
					...rest,
					endpoint: params.dockerEndpoint || endpoint,
				});

				console.log(
					{
						...rest,
						endpoint: params.dockerEndpoint || endpoint,
					},
					"CLIENT S3",
				);

				const uploadParams = {
					Bucket: bucket,
					Key: pdfKey,
					Body: passThroughStream,
				};

				const upload = new Upload({
					client: s3Client,
					params: uploadParams,
					queueSize: 4,
					partSize: 5 * 1024 * 1024,
				});

				got
					.stream(`${this.endpoint}/forms/libreoffice/convert`, {
						method: "POST",
						form: {
							downloadFrom: downloadFromPayload,
						},
						headers: {
							authorization: this.authorization,
						},
					})
					.pipe(passThroughStream);

				upload.on("httpUploadProgress", (progress) => {
					console.log(
						`Uploaded ${progress.loaded} bytes out of ${progress.total}`,
					);
				});

				try {
					const data = await upload.done();
					console.log("Upload successful:", data);
				} catch (err) {
					console.error("Error uploading file:", err);
				}
			});
		} catch (err) {
			console.error(err);
		}
	}
}
