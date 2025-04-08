export type Message = {
	id: string;
	response?: ResponseAndRequest;
	request?: ResponseAndRequest;
};

export type ResponseAndRequest = {
	created_at: string;
	message: string;
	fragments?: Fragment[];
};

export type Fragment = {
	file_path: string;
	page_num: number;
	text: string;
	uuid: string;
	_collection_name: string;
	_id: string;
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

export type Payment = {
	id: string;
	collection: string;
	embedding: string;
	llm: string;
	reranker: string;
	providers: string;
};
