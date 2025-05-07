export const uploadTranscriptionDocs = async (formData: FormData) => {
	const response = await fetch(`api/v1/transcription`, {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return response.json();
};
