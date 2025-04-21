import { WikiSync } from "@/types/types.js";

export const getWiki = async ({ apiKey, baseUrl, collectionId }: WikiSync) => {
	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_URL}/wiki/sync`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				apiKey,
				baseUrl,
				collectionId,
			}),
		},
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};
