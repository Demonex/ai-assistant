import type { ChangeEvent, Dispatch, SetStateAction } from "react";

export type MessageProps = {
	id: number;
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

export type ChatInputProps = {
	files: File[];
	handleDrop: (event: ChangeEvent<HTMLInputElement>) => void;
	setFiles: Dispatch<SetStateAction<File[]>>;
};

export type MessageType = {
	isEmpty: boolean;
	messages: MessageProps[];
	description: string;
};
