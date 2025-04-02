import { isEmail } from "class-validator";

export function promiseMap(inputValues, mapper) {
	const reducer = (acc$, inputValue) =>
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
