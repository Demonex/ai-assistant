import type { MessagesType } from "@repo/web/types/types.js";
import { useCallback, useEffect, useState } from "react";
import { useFetch, createMonoHook, useLazyFetch } from "use-mono-hook";

const _useChats = () => {
	const { data: chats } = useFetch({
		url: "/api/rest/chats",
	});

	const [fetchErrors, setFetchErrors] = useState([]);
	const [activeChat, setActiveChat] = useState<{
		id: number;
	}>();

	const [messages, setMessages] = useState<MessagesType>();

	// fetchMessages //

	const [{ data: messagesData, error: messagesError }, fetchMessages] =
		(useLazyFetch({
			url: "/api/rest/chat/{activeChat.id}",
		}) as [
			{ data: MessagesType; error: Error },
			(options: { url: string }) => void,
		]) || [{}];

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

	const [
		{ data: messageResponse, loading: messageLoading, error: messageError },
		fetchSendMessage,
	] = useLazyFetch({
		url: "/api/rest/chat/{activeChat.id}/message",
		method: "post",
	}) as [
		{ data: any; loading: boolean; error: Error },
		(options: { url: string; data: { raw: string } }) => void,
	];

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
		{ data: _uploadFile, loading: fileLoading, error: fileError },
		fetchUploadFile,
	] = useLazyFetch({
		url: "/api/rest/chat/{activeChat.id}/upload",
		method: "post",
	}) as [
		{ data: any; loading: boolean; error: Error },
		(options: {
			url: string;
			data: FormData;
			headers: { "Content-Type": string };
		}) => void,
	];

	const sendUploadFile = useCallback(
		({ formData }: { formData: FormData }) => {
			fetchUploadFile({
				url: `/api/rest/chat/${activeChat.id}/upload`,
				data: formData,
				headers: { "Content-Type": "multipart/form-data" },
			});
		},
		[activeChat?.id, fetchUploadFile],
	);

	// setErrors //

	useEffect(() => {
		const newErrors = [messagesError, messageError, fileError].filter(
			Boolean,
		) as Error[];

		if (newErrors.length) setFetchErrors(newErrors);
	}, [messagesError, messageError, fileError]);

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
		fetchErrors,
		setFetchErrors,
		uploadFile: _uploadFile,
	};
};

export const useChats = createMonoHook<typeof _useChats>(_useChats, {
	defaults: {
		chats: [],
		messages: [],
	},
}).useHook;
