import { NeuroRequestType } from "@/types/types.js";

export const getNeuros = async () => {
	const response = await fetch("/api/v1/neuro");

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};

export const getNeuro = async (id: number) => {
	const response = await fetch(`/api/v1/neuro/${id}`);

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};

export const createNeuro = async (newNeuro: NeuroRequestType) => {
	const response = await fetch("/api/v1/neuro", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newNeuro),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};

export const updateNeuro = async (
	id: number,
	updatedNeuro: NeuroRequestType,
) => {
	const response = await fetch(`/api/v1/neuro/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updatedNeuro),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};
