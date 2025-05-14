export const getWikiTree = async (collectionId: number) => {
	const response = await fetch(`/api/v1/wiki/${collectionId}/tree`);

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};

export const uploadWikiDocs = async (collectionId: number, ids: number[]) => {
	const response = await fetch(`/api/v1/wiki/${collectionId}/upload`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ ids }),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return response.json();
};

export const removeWikiDocs = async (collectionId: number, ids: number[]) => {
	const response = await fetch(`/api/v1/wiki/${collectionId}/remove`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ ids }),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return response.json();
};
