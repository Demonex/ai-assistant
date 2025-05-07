export type WikiPageType = {
	id: number;
	title: string;
	path: string;
	parent?: number | null;
	isFolder: boolean;
	isUpload: boolean;
	children?: WikiPageType[];
	createdAt?: string;
	updatedAt?: string;
	isPrivate: boolean;
	isPublished: boolean;
	depth?: number;
};

export type WikiSinglePageType = {
	id: number;
	title: string;
	path: string;
	updatedAt: string;
	content: string;
};

export type WikiPageTreeType = {
	pages: {
		list: WikiPageType[];
	};
};

export type WikiSinglePageResponseType = {
	pages: {
		single: WikiSinglePageType;
	};
};
