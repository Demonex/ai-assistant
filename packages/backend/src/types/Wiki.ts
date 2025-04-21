export type WikiPage = {
	id: number;
	title: string;
	path: string;
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
};

export type WikiPageTree = {
	pages: {
		list: WikiPage[];
	};
};
