export type WikiPageType = {
	id: number;
	title: string;
	path: string;
	parent: number | null;
	isFolder: boolean;
	children?: WikiPageType[];
	createdAt?: string;
	updatedAt?: string;
	isPrivate: boolean;
	isPublished: boolean;
	depth?: number;
};

export type WikiPageTreeType = {
	pages: {
		list: WikiPageType[];
	};
};
