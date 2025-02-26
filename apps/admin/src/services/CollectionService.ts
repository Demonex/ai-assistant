import axios, { AxiosError } from "axios";

const host = "http://10.199.35.49";
const port = "2050";

const api = axios.create({
	baseURL: `${host}:${port}`,
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
