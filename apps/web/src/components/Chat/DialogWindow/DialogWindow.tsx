import {
	Fragment,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import {
	ALLOWED_EXTENSIONS_MEDIA,
	ALLOWED_EXTENSIONS_TEXT,
	EXTENSIONS_TYPES,
} from "@repo/web/constants/index.js";
import { formatLocalTime } from "@repo/web/helpers/index.js";
import { toast } from "@repo/web/hooks/use-toast.js";
import { useChats } from "@repo/web/hooks/useChats.js";
import type { GroupMessages } from "@repo/web/types/types.js";

// import { messageMockData } from "../../../DataBase.js";
import { ChatForm } from "./component/ChatForm.js";
import { HeaderDialogWindow } from "./component/HeaderDialogWindow.js";
import { MessageBubble } from "./component/MessageBubble.js";
import { ReactMarkdownComponent } from "./component/ReactMarkdownComponent.js";
import { ScrollToBottomButton } from "./component/ScrollToBottomButton.js";

export const DialogWindow = () => {
	const {
		messages,
		activeChat,
		setActiveChat,
		messageLoading,
		fetchErrors,
		setFetchErrors,
	} = useChats();

	const messagesEndRef = useRef(null);
	const chatContainerRef = useRef(null);

	const [files, setFiles] = useState([]);
	const [isOverlay, setIsOverlay] = useState(false);

	const onReturnToMenu = () => {
		setActiveChat(null);
	};

	const handleDragEnter = (event) => {
		event.preventDefault();
		setIsOverlay(true);
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleDragLeave = (event) => {
		event.preventDefault();
		setIsOverlay(false);
	};

	const isFileAllowed = (fileType: string): boolean => {
		return !!fileType && EXTENSIONS_TYPES.includes(fileType);
	};

	const filterAllowedFiles = (files: File[]): File[] => {
		return files.filter((file) => isFileAllowed(file.type));
	};

	const getUniqueFiles = (existingFiles: File[], newFiles: File[]): File[] => {
		const existingFileNames = new Set(existingFiles.map((file) => file.name));
		return newFiles.filter((file) => !existingFileNames.has(file.name));
	};

	const handleDrop = useCallback((event) => {
		event.preventDefault();
		setIsOverlay(false);

		const newFiles: File[] = Array.from(
			event.dataTransfer?.files || event.target?.files,
		);

		const filteredFiles = filterAllowedFiles(newFiles);

		if (filteredFiles.length < newFiles.length) {
			toast({
				variant: "destructive",
				title: "Ошибка формата!",
				description:
					"Некоторые файлы имеют недопустимый формат и не были добавлены. Допустимые форматы указаны в памятке пользователя.",
			});
		}

		if (filteredFiles.length) {
			setFiles((prevFiles) => {
				const uniqueNewFiles = getUniqueFiles(prevFiles, filteredFiles);
				return [...prevFiles, ...uniqueNewFiles];
			});
		}
	}, []);

	const groupingMessages = useMemo<GroupMessages[]>(() => {
		// const messageList = messageMockData.messages;
		const messageList = messages?.messages;

		if (!messageList) return null;

		const grouping = messageList?.reduce((grouped, message) => {
			const createTime = message.request
				? message.request.created_at
				: message.response.created_at;
			const date = createTime.split("T")[0];

			if (!grouped[date]) {
				grouped[date] = [];
			}
			grouped[date].push(message);

			return grouped;
		}, {});

		return Object.entries(grouping);
	}, [messages]);

	useEffect(() => {
		requestAnimationFrame(() => {
			messagesEndRef.current?.scrollIntoView();
		});
	}, [messages]);

	useEffect(() => {
		if (fetchErrors.length) {
			fetchErrors.forEach((error) => {
				toast({
					variant: "destructive",
					title: error.status,
					description: error.message,
				});
			});
			setFetchErrors([]);
		}
	}, [fetchErrors]);

	return (
		<div className="flex-grow">
			<div className="fixed inset-0 flex flex-col bg-background p-4 lg:relative lg:bg-transparent lg:p-0">
				<HeaderDialogWindow
					onReturnToMenu={onReturnToMenu}
					activeChat={activeChat}
				/>

				<div
					dir="ltr"
					className="overflow-hidden relative h-screen w-full lg:h-[calc(100vh-9rem)]"
					onDragEnter={handleDragEnter}
				>
					{isOverlay && !messageLoading && (
						<div
							onDragOver={handleDragOver}
							onDrop={handleDrop}
							onDragLeave={handleDragLeave}
							className="absolute border top-0 py-10 left-0 w-full h-full bg-white bg-opacity-90 flex flex-col items-center justify-center text-black z-[2]"
						>
							<div className="max-w-[70%]">
								<div className="text-xl font-semibold mb-2">
									Перетащите файлы в эту область
								</div>

								<div className="flex flex-col text-sm">
									<div>
										Для загрузки:{" "}
										<span className="font-semibold">
											{ALLOWED_EXTENSIONS_TEXT.join(", ")}
										</span>
									</div>
									<div>
										Для транскрипции:{" "}
										<span className="font-semibold">
											{ALLOWED_EXTENSIONS_MEDIA.join(", ")}
										</span>
									</div>
								</div>
							</div>
						</div>
					)}

					<style
						dangerouslySetInnerHTML={{
							__html:
								"\n[data-radix-scroll-area-viewport] {\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  -webkit-overflow-scrolling: touch;\n}\n[data-radix-scroll-area-viewport]::-webkit-scrollbar {\n  display: none;\n}\n:where([data-radix-scroll-area-viewport]) {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n:where([data-radix-scroll-area-content]) {\n  flex-grow: 1;\n}\n",
						}}
					/>
					{messages?.messages?.length === 0 && (
						<div className="w-full flex justify-center text-center font-semibold absolute left-0 top-[50%] transform translate-y-[-50%]">
							<ReactMarkdownComponent textMarkdown={messages?.description} />
						</div>
					)}
					<div
						ref={chatContainerRef}
						data-radix-scroll-area-viewport
						className="overflow-scroll h-full w-full rounded-[inherit]"
					>
						<div data-radix-scroll-area-content>
							<div className="flex flex-col items-start space-y-10 pb-[14rem] min-h-screen justify-center first:pt-4">
								{groupingMessages?.map(([date, messages]) => (
									<Fragment key={date}>
										<div className="mx-auto max-w-max text-center text-gray-500 text-sm">
											{formatLocalTime(date, "date")}
										</div>
										{messages?.map((message) => (
											<Fragment key={message.id}>
												{message.request && (
													<MessageBubble message={message} isRequest={true} />
												)}
												{message.response && (
													<MessageBubble message={message} isRequest={false} />
												)}
											</Fragment>
										))}
									</Fragment>
								))}
							</div>

							<div ref={messagesEndRef} />
						</div>
					</div>
				</div>

				<div className="relative lg:absolute left-0 right-0 bottom-0 shadow-base bg-card text-card-foreground">
					<div className="rounded-lg border">
						<ChatForm
							files={files}
							handleDrop={handleDrop}
							setFiles={setFiles}
						/>
					</div>

					<div className="absolute bottom-[calc(100%+40px)] right-0 z-50">
						<ScrollToBottomButton ref={chatContainerRef} />
					</div>
				</div>
			</div>
		</div>
	);
};
