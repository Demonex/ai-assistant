export type UploadedFile = {
	buffer: Buffer;
	filename?: string;
	originalname?: string;
	encoding?: string;
	mimetype?: string;
	size?: number;
	destination?: string;
	path?: string;
};
