export const getWiki = async ({
	apiKey,
	baseUrl,
}: {
	apiKey: string;
	baseUrl: string;
}) => {
	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_URL}/wiki/tree`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				apiKey,
				baseUrl,
			}),
		},
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};
