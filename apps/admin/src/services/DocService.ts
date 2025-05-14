import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
	baseURL,
});

type RequestOptions = {
	method: "GET" | "POST" | "PUT" | "DELETE";
	url: string;
	data?: unknown;
	params?: Record<string, unknown>;
	headers?: Record<string, string>;
};

const makeRequest = async <T>(options: RequestOptions): Promise<T> => {
	console.log({
		method: options.method,
		url: options.url,
		data: options.data,
		params: options.params,
		headers: options.headers,
		withCredentials: true,
	});

	try {
		const response = await api({
			method: options.method,
			url: options.url,
			data: options.data,
			params: options.params,
			headers: options.headers,
			withCredentials: true,
		});

		return response.data;
	} catch (error) {
		console.log(JSON.stringify(error, null, 4));

		if (axios.isAxiosError(error)) {
			throw new Error(`Request failed: ${error}`);
		}
		throw error;
	}
};

const DocService = {
	delete: async (id: number) => {
		return makeRequest({
			method: "DELETE",
			url: `/api/v1/docs/${id}`,
			headers: {
				"x-api-key": "your-secret-api-key-123sigma",
			},
		});
	},
};

export { DocService };
