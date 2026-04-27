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
		if (axios.isAxiosError(error)) {
			throw new Error(`Request failed: ${error.message}`);
		}
		throw error;
	}
};

const CollectionService = {
	filesUpload: async <T>(collectionId: number, data: FormData): Promise<T> => {
		return makeRequest({
			method: "POST",
			url: `/api/v1/chat/${collectionId}/upload`,
			data,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
};

export { CollectionService };
