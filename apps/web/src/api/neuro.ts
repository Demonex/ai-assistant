export const getNeuros = async () => {
	const response = await fetch("/api/v1/neuro");

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}
	return await response.json();
};
