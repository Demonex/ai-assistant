export type UploadedFile = {
	filename?: string;
	buffer: Buffer;
	originalname?: string;
	encoding?: string;
	mimetype?: string;
	size?: number;
	destination?: string;
	path?: string;
};
