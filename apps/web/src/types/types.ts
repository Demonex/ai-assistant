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

//////////////////////////////////////////////////////////////////////

export enum PROVIDER_ENUM_TYPE {
	minio = "minio",
	confluence = "confluence",
	wikijs = "wikijs",
}

export type CollectionType = {
	id?: string;
	title?: string;
	description?: string;
	embedding?: NeuroType;
	llm?: NeuroType;
	reranker?: NeuroType;
	tenant?: TenantType;
	providers?: ProviderInCollectionType[];
};

export type NeuroType = {
	id: number;
	title: string;
	model?: ModelType;
	modelSettings?: string | null;
};

export type ProviderInCollectionType = {
	id: number;
	title: string;
	provider?: number;
};

export type ProviderType<T = Record<string, unknown>> = {
	id: number;
	settings: T;
	tenant: number;
	title: string;
	type: string;
};

export type TenantType = {
	id: number;
	title: string;
};

export type ModelType = {
	id: number;
	title: string;
	type?: string;
	tenant?: TenantType;
};

export type CollectionRequestType = {
	title?: string;
	description?: string;
	embeddingTitle?: string;
	llmTitle?: string;
	providerTitle?: string;
	rerankerTitle?: string;
	tenantTitle?: string;
};

export type NeuroRequestType = {
	title?: string;
	model?: string;
	settings?: string;
};

export type ModelRequestType = {
	title?: string;
	tenant?: string;
	type?: string;
};
