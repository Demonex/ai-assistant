export type WikiPageTreeNode = {
	id: number;
	title: string;
	path: string;
	parent: number | null;
	isFolder: boolean;
	pageId: number | null;
	children?: WikiPageTreeNode[];
	createdAt?: string;
	updatedAt?: string;
	depth?: number;
};

export type WikiPageTree = {
	pages: {
		list: WikiPageTreeNode[];
	};
};
