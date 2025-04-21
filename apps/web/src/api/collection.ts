export const getCollections = async (tenantId: number) => {
	const response = await fetch(`/api/v1/collections/${tenantId}`);

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};

export const getCollection = async (collectionId: number) => {
	const response = await fetch(`/api/v1/collections/${collectionId}`);

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};

export const createCollection = async (newCollection) => {
	const response = await fetch("/api/v1/collections", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newCollection),
	});

	return response;
};

export const updateCollection = async (id: number, data) => {
	const response = await fetch(`/api/v1/collections/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	return response;
};
