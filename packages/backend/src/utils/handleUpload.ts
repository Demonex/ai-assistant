import * as AWS from "@aws-sdk/client-s3";
import {
	CreateBucketCommand,
	PutBucketPolicyCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

type Args = {
	acl?: "private" | "public-read";
	bucket: string;
	getStorageClient: () => AWS.S3ClientConfig;
	prefix?: string;
};

const multipartThreshold = 1024 * 1024 * 50; // 50MB

export const getHandleUpload = ({ acl, bucket, getStorageClient }: Args) => {
	return async ({ file }) => {
		const fileKey = file.originalname;
		const fileBufferOrStream = file.buffer;

		const encodedFileName = encodeURIComponent(fileKey)
			.replace(/'/g, "%27")
			.replace(/\(/g, "%28")
			.replace(/\)/g, "%29");

		const s3Client = new AWS.S3(getStorageClient());

		try {
			await s3Client.send(new CreateBucketCommand({ Bucket: bucket }));
			console.log(`Bucket "${bucket}" created successfully.`);

			const bucketPolicy = {
				Version: "2012-10-17",
				Statement: [
					{
						Sid: "PublicReadGetObject",
						Effect: "Allow",
						Principal: "*",
						Action: "s3:GetObject",
						Resource: `arn:aws:s3:::${bucket}/*`,
					},
				],
			};
			const putBucketPolicyParams = {
				Bucket: bucket,
				Policy: JSON.stringify(bucketPolicy),
			};
			await s3Client.send(new PutBucketPolicyCommand(putBucketPolicyParams));
			console.log(
				`Bucket policy set to grant public read access for bucket "${bucket}".`,
			);
		} catch (error) {
			console.error("Error creating bucket or setting policies:", error);
		}

		if (file.buffer.length > 0 && file.buffer.length < multipartThreshold) {
			await s3Client.putObject({
				ACL: acl,
				Body: fileBufferOrStream,
				Bucket: bucket,
				ContentType: file.mimetype,
				ContentDisposition: `inline; filename*=UTF-8''${encodedFileName}`,
				Key: Buffer.from(fileKey, "utf-8").toString(),
			});

			return fileKey;
		}

		const parallelUploadS3 = new Upload({
			client: s3Client,
			params: {
				ACL: acl,
				Body: fileBufferOrStream,
				Bucket: bucket,
				ContentType: file.mimetype,
				Key: Buffer.from(fileKey, "utf-8").toString(),
			},
			partSize: multipartThreshold,
			queueSize: 4,
		});
		await parallelUploadS3.done();

		return fileKey;
	};
};
