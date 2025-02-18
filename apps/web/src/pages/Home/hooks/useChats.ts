import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetch, createMonoHook, useLazyFetch } from "use-mono-hook";

type UserType = {
	id: number;
	name: string;
};

type MessageType = {
	user: UserType | null;
	messages: {
		raw: string;
	};
};

const _useChats = (id: number) => {
	const { data: chats } = useFetch({
		url: "/api/rest/chats",
	});

	const [activeChat, setActiveChat] = useState<{
		id: number;
	}>();

	const [messages, setMessages] = useState<MessageType[]>();

	const reqMessage = useLazyFetch({
		url: "/api/rest/chat/{activeChat.id}",
	});

	const [{ data: messagesData }, fetchMessages] = reqMessage || [{}];

	const [{ data: messageSend, loading }, fetchSendMessage] = useLazyFetch({
		url: "/api/rest/chat/{activeChat.id}/message",
		method: "post",
	});

	const [{ data: uploadFile, status: statusUpload }, fetchUploadFile] =
		useLazyFetch({
			url: "/api/rest/chat/{activeChat.id}/upload",
			method: "post",
		});

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

	const sendUploadFile = useCallback(
		({ formData }) => {
			fetchUploadFile({
				url: `/api/rest/chat/${activeChat.id}/upload`,
				body: formData,
			});
		},
		[activeChat?.id, fetchUploadFile],
	);

	useEffect(() => {
		if (!messageSend) {
			return;
		}

		setMessages((prev) => [
			...prev,
			{
				success: messageSend.success,
				response: {
					created_at: messageSend.response.created_at,
					message: messageSend.response.message,
					fragments: messageSend.response.fragments,
				},
			},
		]);
	}, [messageSend]);

	return {
		chats,
		activeChat,
		setActiveChat,
		setMessages,
		messages,
		sendMessage,
		loading,
		sendUploadFile,
		statusUpload,
	};
};

export const useChats = createMonoHook<typeof _useChats>(_useChats, {
	defaults: {
		chats: [],
		messages: [],
	},
}).useHook;
