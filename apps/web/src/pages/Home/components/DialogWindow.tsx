import { Fragment, useCallback, useEffect, useRef, useState } from "react";
// import { DropdownMenuButton } from "./DropdownMenuButton.js";
import { toast } from "@/hooks/use-toast.js";
import { useChats } from "../hooks/useChats.js";
import { messageMockData } from "@/DataBase.js";
import { MessageBubble } from "./MessageBubble.js";
import { ChatForm } from "./ChatForm.js";
import { HeaderDialogWindow } from "./HeaderDialogWindow.js";
import { ReactMarkdownComponent } from "./ReactMarkdownComponent.js";
import { ALLOWED_EXTENSIONS } from "@/constants/index.js";
import { formatLocalTime } from "@/helpers/index.js";
import type { GroupedMessages } from "@/types/types.js";

export const DialogWindow = () => {
	const {
		messages,
		activeChat,
		setActiveChat,
		messageLoading,
		fileLoading,
		fetchErrors,
		setFetchErrors,
	} = useChats();

	const hasMounted = useRef(false);
	const messagesEndRef = useRef(null);

	const [files, setFiles] = useState([]);
	const [groupMessages, setGroupMessages] = useState<GroupedMessages>();
	const [isOverlay, setIsOverlay] = useState(false);

	const onReturnToMenu = () => {
		setActiveChat(false);
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

	const isFileAllowed = (fileName: string): boolean => {
		const extension = fileName.split(".").pop()?.toLowerCase();
		return !!extension && ALLOWED_EXTENSIONS.includes(extension);
	};

	const filterAllowedFiles = (files: File[]): File[] => {
		return files.filter((file) => isFileAllowed(file.name));
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
				description: `Некоторые файлы имеют недопустимый формат и не были добавлены. Допустимые форматы (${ALLOWED_EXTENSIONS.join(", ")})`,
			});
		}

		if (filteredFiles.length) {
			setFiles((prevFiles) => {
				const uniqueNewFiles = getUniqueFiles(prevFiles, filteredFiles);
				return [...prevFiles, ...uniqueNewFiles];
			});
		}
	}, []);

	const groupMessagesByDate = (messages) => {
		// const set = new Set();
		// messages.messages.forEach((item) => {
		//   const date = item.request.created_at.split("T")[0];
		//   if (!set.has(date)) {
		//     set.add(item.request.created_at.split("T")[0]);
		//   }
		// });
		// return Array.from(set);
		return messages.messages.reduce((grouped, message) => {
			const date = message.request.created_at.split("T")[0];
			if (!grouped[date]) {
				grouped[date] = [];
			}
			grouped[date].push(message);
			return grouped;
		}, {});
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView();
		hasMounted.current = true;
	}, []);

	useEffect(() => {
		if (!messages?.messages?.length) return;

		setGroupMessages(groupMessagesByDate(messages));

		if (hasMounted.current) {
			requestAnimationFrame(() => {
				messagesEndRef.current?.scrollIntoView({
					block: "end",
				});
			});
		}
	}, [messages]);

	useEffect(() => {
		if (fileLoading) {
			toast({
				title: "Файл загружается!",
				description:
					"Загрузка займет некоторое время, после чего информация из файла станет доступна.",
			});
		}
	}, [fileLoading]);

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

	console.log(groupMessages, "сообщения");

	return (
		<div className="flex-grow">
			<div className="fixed inset-0 flex flex-col bg-background p-4 lg:relative lg:bg-transparent lg:p-0">
				<HeaderDialogWindow
					onReturnToMenu={onReturnToMenu}
					activeChat={activeChat}
				/>

				<div
					dir="ltr"
					className="overflow-hidden relative h-screen w-full lg:h-[calc(100vh_-_9rem)]"
					onDragEnter={handleDragEnter}
				>
					{isOverlay && !messageLoading && (
						<div
							onDragOver={handleDragOver}
							onDrop={handleDrop}
							onDragLeave={handleDragLeave}
							className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex items-center justify-center text-black z-[2]"
						>
							Перенесите файл сюда (doc, docx, pdf, txt)
						</div>
					)}

					<style
						dangerouslySetInnerHTML={{
							__html:
								"\n[data-radix-scroll-area-viewport] {\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  -webkit-overflow-scrolling: touch;\n}\n[data-radix-scroll-area-viewport]::-webkit-scrollbar {\n  display: none;\n}\n:where([data-radix-scroll-area-viewport]) {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n:where([data-radix-scroll-area-content]) {\n  flex-grow: 1;\n}\n",
						}}
					/>
					{messages?.messages?.length === 0 && (
						<div className="w-full flex justify-center absolute left-0 top-[50%] transform translate-y-[-50%]">
							<ReactMarkdownComponent textMarkdown={messages?.description} />
						</div>
					)}
					<div
						data-radix-scroll-area-viewport
						className="overflow-scroll h-full w-full rounded-[inherit]"
					>
						<div data-radix-scroll-area-content>
							<div>
								<div className="flex flex-col items-start space-y-10 pb-[12rem] min-h-screen justify-center first:pt-4">
									{groupMessages &&
										Object.entries(groupMessages)?.map(([date, messages]) => (
											<Fragment key={date}>
												<div className="mx-auto max-w-max text-center text-gray-500 text-sm">
													{formatLocalTime(date, "date")}
												</div>
												{/* {messageMockData?.messages.map((message) => ( */}
												{messages?.map((message) => (
													<Fragment key={message.id}>
														{message.request && (
															<MessageBubble
																message={message}
																isRequest={true}
															/>
														)}
														{message.response && (
															<MessageBubble
																message={message}
																isRequest={false}
															/>
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
				</div>

				<div className="relative lg:absolute left-0 right-0 bottom-0 shadow-base bg-card text-card-foreground">
					<div className="rounded-lg border">
						<ChatForm
							files={files}
							handleDrop={handleDrop}
							setFiles={setFiles}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
