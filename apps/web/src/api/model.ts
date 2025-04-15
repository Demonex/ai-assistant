export const getModels = async () => {
	const response = await fetch("/api/v1/models");

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};
