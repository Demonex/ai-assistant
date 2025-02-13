import * as AWS from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

interface Args {
	acl?: "private" | "public-read";
	bucket: string;
	getStorageClient: () => AWS.S3ClientConfig;
	prefix?: string;
}

const multipartThreshold = 1024 * 1024 * 50; // 50MB

export const getHandleUpload = ({
	acl,
	bucket,
	getStorageClient,
	prefix = "",
}: Args) => {
	return async ({ file }) => {
		const fileKey = file.originalname;
		const fileBufferOrStream = file.buffer;

		if (file.buffer.length > 0 && file.buffer.length < multipartThreshold) {
			await new AWS.S3(getStorageClient()).putObject({
				ACL: acl,
				Body: fileBufferOrStream,
				Bucket: bucket,
				ContentType: file.mimeType,
				Key: fileKey,
			});

			return fileKey;
		}

		const parallelUploadS3 = new Upload({
			client: new AWS.S3(getStorageClient()),
			params: {
				ACL: acl,
				Body: fileBufferOrStream,
				Bucket: bucket,
				ContentType: file.mimeType,
				Key: fileKey,
			},
			partSize: multipartThreshold,
			queueSize: 4,
		});
		await parallelUploadS3.done();

		return fileKey;
	};
};
