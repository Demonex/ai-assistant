export const getWiki = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wiki/tree`);

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};
