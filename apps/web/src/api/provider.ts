export const getProviders = async () => {
	const response = await fetch("/api/v1/providers");

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};
