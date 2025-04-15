export const getWiki = async (apiKey) => {
	const response = await fetch(`${import.meta.env.VITE_ADMIN_URL}/wiki/tree`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			apiKey: apiKey,
		}),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};
