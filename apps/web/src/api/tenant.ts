export const getTenants = async () => {
	const response = await fetch("/api/v1/tenants");

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};
