import axios, { AxiosError } from "axios";

const baseURL = process.env.BACKEND_URL || "http://10.199.35.49:2050";

const api = axios.create({
	baseURL,
});

interface RequestOptions {
	method: "GET" | "POST" | "PUT" | "DELETE";
	url: string;
	data?: any;
	params?: any;
	headers?: any;
}

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
	filesUpload: async <T>(collectionId: number, data: any): Promise<T> => {
		return makeRequest({
			method: "POST",
			url: `/api/rest/chat/${collectionId}/upload`,
			data,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
};

export { CollectionService };
