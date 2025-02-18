import { useCallback, useEffect, useState } from "react";
import { useFetch, createMonoHook, useLazyFetch } from "use-mono-hook";

type FragmentsType = {
	uuid: string;
	file_path: string;
	page_num: number;
	_id: string;
	_collection_name: string;
	text: string;
};

type MessageType = {
	success: boolean;
	response: {
		created_at: string;
		message: string;
		fragments: FragmentsType[];
	};
};

const _useChats = () => {
	const { data: chats } = useFetch({
		url: "/api/rest/chats",
	});

	const [activeChat, setActiveChat] = useState<{
		id: number;
	}>();

	const [messages, setMessages] = useState<MessageType[]>();

	// fetchMessages //

	const [{ data: messagesData }, fetchMessages] = useLazyFetch({
		url: "/api/rest/chat/{activeChat.id}",
	}) || [{}];

	useEffect(() => {
		if (!activeChat?.id || !fetchMessages) {
			return;
		}

		fetchMessages({
			url: `/api/rest/chat/${activeChat.id}`,
		});
	}, [activeChat?.id, fetchMessages]);

	useEffect(() => {
		if (!messagesData) {
			return;
		}

		setMessages(messagesData);
	}, [messagesData]);

	// fetchSendMessage //

	const [{ data: messageSend, loading: messageLoading }, fetchSendMessage] =
		useLazyFetch({
			url: "/api/rest/chat/{activeChat.id}/message",
			method: "post",
		});

	const sendMessage = useCallback(
		({ message }) => {
			fetchSendMessage({
				url: `/api/rest/chat/${activeChat.id}/message`,
				data: {
					raw: message,
				},
			});
		},
		[activeChat?.id, fetchSendMessage],
	);

	useEffect(() => {
		if (!messageSend) {
			return;
		}

		setMessages((prev) => [...prev, { ...messageSend }]);
	}, [messageSend]);

	// fetchUploadFile //

	const [{ data: _uploadFile, loading: fileLoading }, fetchUploadFile] =
		useLazyFetch({
			url: "/api/rest/chat/{activeChat.id}/upload",
			method: "post",
		});

	const sendUploadFile = useCallback(
		({ formData }) => {
			fetchUploadFile({
				url: `/api/rest/chat/${activeChat.id}/upload`,
				data: formData,
				headers: { "Content-Type": "multipart/form-data" },
			});
		},
		[activeChat?.id, fetchUploadFile],
	);

	return {
		chats,
		activeChat,
		setActiveChat,
		setMessages,
		messages,
		sendMessage,
		messageLoading,
		sendUploadFile,
		fileLoading,
	};
};

export const useChats = createMonoHook<typeof _useChats>(_useChats, {
	defaults: {
		chats: [],
		messages: [],
	},
}).useHook;
