import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
// import { DropdownMenuButton } from "./DropdownMenuButton.js";
import { toast } from "@/hooks/use-toast.js";
import { useChats } from "../hooks/useChats.js";
import { messageMockData } from "@/DataBase.js";
import { MessageBubble } from "./MessageBubble.js";
import { ChatInput } from "./ChatInput.js";
import { HeaderDialogWindow } from "./HeaderDialogWindow.js";
import { ReactMarkdownComponent } from "./ReactMarkdownComponent.js";

export const DialogWindow = () => {
	const {
		messages,
		setMessages,
		activeChat,
		setActiveChat,
		sendMessage,
		messageLoading,
		sendUploadFile,
		fileLoading,
		fetchErrors,
		setFetchErrors,
	} = useChats();
	const [message, setMessage] = useState("");
	const [files, setFiles] = useState([]);
	const [isOverlay, setIsOverlay] = useState(false);
	const { reset, setValue } = useForm();
	const messagesEndRef = useRef(null);
	const fileInputRef = useRef(null);
	const textareaRef = useRef(null);

	const onSubmit = () =>
		useCallback(() => {
			if (files.length) {
				const formData = new FormData();

				for (let i = 0; i < files.length; i++) {
					formData.append("media", files[i]);
				}

				sendUploadFile({ formData });
				setFiles([]);
				reset();
			} else {
				setMessages([
					...messages.messages,
					{
						id: Date.now().toString(),
						request: { message, created_at: new Date().toString() },
					},
				]);

				sendMessage({ message });
				setValue("message", "");
				setMessage("");
				reset();
			}
		}, [files, messages.messages, message]);

	const handleInputChange = useCallback((event) => {
		const value = event.target.value;
		setMessage(value);
	}, []);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
		});
	};

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

	const handleDrop = useCallback((event) => {
		event.preventDefault();
		setIsOverlay(false);

		const data = event.dataTransfer?.files || event.target?.files;

		if (data.length) {
			const newFiles = Array.from(data);
			setFiles((prevFiles) => [...prevFiles, ...newFiles]);
		}
	}, []);

	const handlePinFileButton = useCallback(() => {
		fileInputRef.current?.click();
	}, [fileInputRef]);

	const handleCloseDocument = useCallback(
		(id: number) => {
			setFiles((files) => files.filter((item) => item.lastModified !== id));
			fileInputRef.current.value = "";
		},
		[files, fileInputRef],
	);

	const handleTextarea = useCallback(() => {
		const textarea = textareaRef.current;
		textarea.style.height = "auto";
		textarea.style.height = `${textarea.scrollHeight}px`;
	}, [textareaRef]);

	useEffect(() => {
		setTimeout(() => scrollToBottom());
	}, [messages?.messages]);

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
					{messages?.messages.length === 0 && (
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
								<div className="flex flex-col items-start space-y-10 pb-[8rem] min-h-screen justify-center first:pt-4">
									{messageMockData?.messages.map((message) => (
										//   {messages?.messages.map((message) => (
										<Fragment key={message.id}>
											{message.request && (
												<MessageBubble message={message} isRequest={true} />
											)}
											{message.response && (
												<MessageBubble message={message} isRequest={false} />
											)}
										</Fragment>
									))}
								</div>
							</div>
						</div>
						<div ref={messagesEndRef} />
					</div>
				</div>

				<div className="relative lg:absolute left-0 right-0 bottom-0 shadow-base bg-card text-card-foreground">
					<div className="rounded-lg border">
						<ChatInput
							onSubmit={onSubmit}
							messageLoading={messageLoading}
							files={files}
							handleCloseDocument={handleCloseDocument}
							handleTextarea={handleTextarea}
							handleInputChange={handleInputChange}
							textareaRef={textareaRef}
							handleDrop={handleDrop}
							handlePinFileButton={handlePinFileButton}
							message={message}
							fileInputRef={fileInputRef}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
