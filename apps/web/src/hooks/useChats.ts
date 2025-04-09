import { useCallback, useEffect, useState } from "react";

import type { ActiveChat, MessagesType } from "@repo/web/types/types.js";
import { createMonoHook, useFetch, useLazyFetch } from "use-mono-hook";

const _useChats = () => {
	const { data: chats, loading: loadingChats } = useFetch({
		url: "/api/v1/chats",
	});

	const [fetchErrors, setFetchErrors] = useState([]);
	const [activeChat, setActiveChat] = useState<ActiveChat>(null);

	const [messages, setMessages] = useState<MessagesType>();

	// fetchMessages //

	const [{ data: messagesData, error: messagesError }, fetchMessages] =
		(useLazyFetch({
			url: "/api/v1/chat/{activeChat.id}",
		}) as [
			{ data: MessagesType; error: Error },
			(options: { url: string }) => void,
		]) || [{}];

	useEffect(() => {
		if (!activeChat?.id || !fetchMessages) {
			return;
		}

		fetchMessages({
			url: `/api/v1/chat/${activeChat.id}`,
		});
	}, [activeChat?.id, fetchMessages]);

	useEffect(() => {
		if (!messagesData) {
			return;
		}

		setMessages(messagesData);
	}, [messagesData]);

	// fetchSendMessage //

	const [
		{ data: messageResponse, loading: messageLoading, error: messageError },
		fetchSendMessage,
	] = useLazyFetch({
		url: "/api/v1/chat/{activeChat.id}/message",
		method: "post",
	});

	const sendMessage = useCallback(
		({ message }) => {
			fetchSendMessage({
				url: `/api/v1/chat/${activeChat.id}/message`,
				data: {
					raw: message,
				},
			});
		},
		[activeChat?.id, fetchSendMessage],
	);

	useEffect(() => {
		if (!messageResponse) {
			return;
		}

		setMessages((prev: MessagesType) => {
			const last = { ...prev.messages.pop(), ...messageResponse };

			return {
				isEmpty: prev.isEmpty,
				messages: [...prev.messages, last],
				description: prev.description,
			};
		});
	}, [messageResponse]);

	// fetchUploadFile //

	const [
		{ data: fileResponse, loading: fileLoading, error: fileError },
		fetchUploadFile,
	] = useLazyFetch({
		url: "/api/v1/chat/{activeChat.id}/upload",
		method: "post",
	});

	const sendUploadFile = useCallback(
		({ formData }: { formData: FormData }) => {
			fetchUploadFile({
				url: `/api/v1/chat/${activeChat.id}/upload`,
				data: formData,
				headers: { "Content-Type": "multipart/form-data" },
			});
		},
		[activeChat?.id, fetchUploadFile],
	);

	// setErrors //

	useEffect(() => {
		const newErrors = [messagesError, messageError, fileError].filter(Boolean);

		if (newErrors.length) setFetchErrors(newErrors);
	}, [messagesError, messageError, fileError]);

	return {
		chats,
		loadingChats,
		activeChat,
		setActiveChat,
		setMessages,
		messages,
		sendMessage,
		messageLoading,
		sendUploadFile,
		fileLoading,
		fileResponse,
		fetchErrors,
		setFetchErrors,
	};
};

export const useChats = createMonoHook<typeof _useChats>(_useChats, {
	defaults: {
		chats: [],
		messages: {
			isEmpty: true,
			messages: [],
			description: "",
		},
	},
}).useHook;
