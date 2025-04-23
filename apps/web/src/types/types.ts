export type ApiError = {
	statusCode: number;
	message: string;
};

export type WikiTreeType = {
	id: number;
	title: string;
	path: string;
	parent: number | null;
	isFolder: boolean;
	pageId: number | null;
	children?: WikiTreeType[];
	createdAt?: string;
	updatedAt?: string;
	depth?: number;
};

export type FileTranscription = {
	file: string;
	transciption: string;
	fullText: string;
	status: string;
};

export type UploadFileError = {
	type: string;
	file: string;
	status: string;
	message: string;
};

export type UploadFiles = {
	audio?: {
		success: FileTranscription[];
		errors: UploadFileError[];
	};
	text?: {
		success: FileTranscription[];
		duplicates: UploadFileError[];
	};
};

export type Profile = {
	email: string;
	id: number;
	name: string;
	superadmin: boolean;
};

export type SignInData = {
	email: string;
	password: string;
};

export type Fragment = {
	file_path: string;
	page_num: number;
	text: string;
	uuid: string;
	_collection_name: string;
	_id: string;
};

export type Message = {
	id: string;
	response?: ResponseAndRequest;
	request?: ResponseAndRequest;
};

export type ResponseAndRequest = {
	created_at: string;
	message?: string;
	fragments?: Fragment[];
	files?: FileTranscription[];
};

export type Chats = {
	id: number;
	title: string;
	tenant: number;
};

export type ActiveChat = {
	id: number;
	title: string;
};

export type MessagesType = {
	isEmpty: boolean;
	messages: Message[];
	description: string;
};

export type GroupMessages = [string, Message[]];

export type Collection = {
	id: string;
	title: string;
	embedding: EmbeddingType;
	llm: LLMType;
	reranker: RerankerType;
	providers: ProviderType[];
};

export type EmbeddingType = {
	id: number;
	title: string;
};

export type LLMType = {
	id: number;
	title: string;
};

export type RerankerType = {
	id: number;
	title: string;
};

export type ProviderType = {
	id: number;
	provider: number;
};
