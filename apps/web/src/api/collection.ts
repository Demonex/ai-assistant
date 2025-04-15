export const getCollections = async () => {
	const response = await fetch("/api/v1/collections");

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
