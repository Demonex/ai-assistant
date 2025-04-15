export const getProfile = async () => {
	const response = await fetch("api/v1/profile");

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return await response.json();
};

export const signIn = async ({ email, password }) => {
	const response = await fetch("api/v1/auth/email/sign-in", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return response.json();
};

export const signOut = async () => {
	const response = await fetch("api/v1/auth/user/sign-out", {
		method: "POST",
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	return response.json();
};
