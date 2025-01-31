export enum GROUP_PERMISSIONS {
	admin = "admin",
	collection = "collection",
	model = "model",
	group = "group",
}

export enum COLLECTION_PERMISSIONS {
	read = "r",
	read_write = "rw",
	read_write_delete = "rwd",
}

export enum MODEL_TYPE {
	llm = "llm",
	embedding = "embedding",
	reranker = "reranker",
}
