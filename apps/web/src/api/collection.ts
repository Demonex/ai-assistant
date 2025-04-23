import { CollectionRequestType } from "@/types/types.js";

export const getCollections = async (tenantId: number) => {
	const response = await fetch(`/api/v1/collections/${tenantId}`);

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};

export const getCollection = async (collectionId: number) => {
	const response = await fetch(
		`/api/v1/collections/collection/${collectionId}`,
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};

export const createCollection = async (
	newCollection: CollectionRequestType,
) => {
	const response = await fetch("/api/v1/collections", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newCollection),
	});

	return response;
};

export const updateCollection = async (
	id: number,
	updatedCollection: CollectionRequestType,
) => {
	const response = await fetch(`/api/v1/collections/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updatedCollection),
	});

	return response;
};
