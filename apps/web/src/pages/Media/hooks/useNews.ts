import useSharedHook from "../../../hooks/useSharedHook.js";
import { useLazyFetch } from "../../../hooks/useFetch.js";
import { BACKEND_URL } from "../../../constants/index.js";
import { useEffect, useState } from "react";

const _useNews = () => {
	const [postId, setPost] = useState(undefined);

	const [{ data: news }, fetchNews] = useLazyFetch({
		url: `${BACKEND_URL}/post`,
		cache: false,
	});
	const [{ data: post, loading }, fetchPost] = useLazyFetch({
		url: `${BACKEND_URL}/post/:id`,
		cache: false,
	});

	useEffect(() => {
		void fetchNews();
	}, []);

	useEffect(() => {
		if (!postId) {
			return;
		}
		fetchPost({
			url: `${BACKEND_URL}/post/${postId}`,
		});
	}, [postId]);

	return {
		loading,
		post,
		news,
		setPost,
	};
};
export const useNews = () =>
	useSharedHook<ReturnType<typeof _useNews>>(_useNews);
