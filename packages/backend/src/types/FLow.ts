export type Fragment = {
	file_path: string;
	page_num: number;
	text: string;
	uuid: string;
	_collection_name: string;
	_id: string;
};

export type FlowResponse = {
	message: string;
	fragments: Fragment[];
	created_at: Date;
};

export type Folder = {
	id: string;
	name: string;
};

export type Flow = {
	id: string;
	name: string;
	folder_id: string;
	data: unknown;
};
