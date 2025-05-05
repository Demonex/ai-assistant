import { WikiDocsRequesttype } from "@/types/types.js";

export const getWikiTree = async (collectionId: number) => {
	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_URL}/wiki/tree/${collectionId}`,
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};

export const uploadWikiDocs = async ({
	collectionId,
	ids,
}: WikiDocsRequesttype) => {
	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_URL}/wiki/upload/${collectionId}`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ids }),
		},
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return response.json();
};

export const removeWikiDocs = async ({
	collectionId,
	ids,
}: WikiDocsRequesttype) => {
	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_URL}/wiki/remove/${collectionId}`,
		{
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ids }),
		},
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return response.json();
};
