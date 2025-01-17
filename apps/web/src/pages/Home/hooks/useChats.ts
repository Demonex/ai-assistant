import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetch, createMonoHook, useLazyFetch } from "use-mono-hook";

const _useChats = () => {
	const { data: chats } = useFetch({
		url: "/api/rest/chats",
	});

	const [activeChat, setActiveChat] = useState<number>();
	console.log("a", activeChat);
	return {
		chats,
		activeChat,
		setActiveChat,
	};
};

export const useChats = createMonoHook<typeof _useChats>(_useChats, {
	defaults: {
		chats: [],
	},
}).useHook;
