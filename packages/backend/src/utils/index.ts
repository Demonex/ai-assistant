import { isEmail } from "class-validator";

export function promiseMap<T, V>(
	inputValues: V[],
	mapper: (arg: V) => Promise<T>,
): Promise<T[]> {
	const reducer = (acc$: Promise<T[]>, inputValue: V) =>
		acc$.then((acc) =>
			mapper(inputValue).then((result) => acc.push(result) && acc),
		);
	return inputValues.reduce(reducer, Promise.resolve([]));
}

export function getEmail(email?: string | unknown): string | null {
	if (typeof email !== "string" || !email || !isEmail(email)) {
		return null;
	}
	return email.trim().toLowerCase();
}

export function logErrors(error: {
	message: string;
	response: {
		statusCode?: number;
		body?: unknown;
		headers?: unknown;
	};
}) {
	console.error("Request failed:", error.message);
	console.error("Status code:", error.response?.statusCode);
	console.error("Response body:", error.response?.body);
	console.error("Headers:", error.response?.headers);
}
