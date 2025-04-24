export type WikiPageTreeType = {
	id: number;
	title: string;
	path: string;
	parent: number | null;
	isFolder: boolean;
	children?: WikiPageTreeType[];
	createdAt?: string;
	updatedAt?: string;
	isPrivate: boolean;
	isPublished: boolean;
	depth?: number;
};

export type WikiPageType = {
	pages: {
		list: WikiPageTreeType[];
	};
};
