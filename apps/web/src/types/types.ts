export interface Message {
	id: number;
	response?: ResponseAndRequest;
	request?: ResponseAndRequest;
}

export interface ResponseAndRequest {
	created_at: string;
	message: string;
	fragments?: Fragment[];
}

export interface Fragment {
	file_path: string;
	page_num: number;
	text: string;
	uuid: string;
	_collection_name: string;
	_id: string;
}

export interface Chats {
	id: number;
	title: string;
	tenant: number;
}

export interface ActiveChat {
	id: number;
	title: string;
}

export interface MessagesType {
	isEmpty: boolean;
	messages: Message[];
	description: string;
}

export type GroupMessages = [string, Message[]];
