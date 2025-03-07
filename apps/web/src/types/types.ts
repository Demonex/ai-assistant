import type { ChangeEvent, MutableRefObject, RefObject } from "react";

export type MessageProps = {
	id: number;
	response?: ResponseAndRequest;
	request?: ResponseAndRequest;
};

export type ResponseAndRequest = {
	created_at: string;
	message: string;
	fragments?: Fragments[];
};

export type Fragments = {
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

export type File = {
	lastModified: number;
	name: string;
	size: number;
};

export type ActiveChat = {
	id: number;
	title: string;
};

export type ChatInputProps = {
	onSubmit: () => void;
	messageLoading: boolean;
	files: File[];
	handleCloseDocument: (id: number) => void;
	handleTextarea: () => void;
	handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	textareaRef: MutableRefObject<HTMLTextAreaElement>;
	handleDrop: (event: ChangeEvent<HTMLInputElement>) => void;
	handlePinFileButton: () => void;
	message: string;
	fileInputRef: RefObject<HTMLInputElement>;
};
