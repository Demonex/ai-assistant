export const docComparison = async (formData) => {
	const response = await fetch("/api/v1/docs/comparison", {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};
