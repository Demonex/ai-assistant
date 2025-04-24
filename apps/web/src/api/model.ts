import { ModelRequestType } from "@/types/types.js";

export const getModels = async () => {
	const response = await fetch("/api/v1/models");

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};

export const getModel = async (id: number) => {
	const response = await fetch(`/api/v1/models/${id}`);

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};

export const createModel = async (newModel: ModelRequestType) => {
	const response = await fetch("/api/v1/models", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newModel),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};

export const updateModel = async (
	id: number,
	updateModel: ModelRequestType,
) => {
	const response = await fetch(`/api/v1/models/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updateModel),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};
