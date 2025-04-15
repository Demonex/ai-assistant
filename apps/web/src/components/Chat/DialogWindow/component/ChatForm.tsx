import { memo, useEffect, useRef, useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { FileUpload } from "@repo/web/components/FileUpload.js";
import { Spinner } from "@repo/web/components/Spinner.js";
import { ALLOWED_EXTENSIONS } from "@repo/web/constants/index.js";
import { toast } from "@repo/web/hooks/use-toast.js";
import { useChats } from "@repo/web/hooks/useChats.js";
import { Paperclip, Play } from "lucide-react";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip.js";

type ChatInputProps = {
	files: File[];
	handleDrop: (event: ChangeEvent<HTMLInputElement>) => void;
	setFiles: Dispatch<SetStateAction<File[]>>;
};

export const ChatForm = memo<ChatInputProps>(
	({ files, handleDrop, setFiles }) => {
		const { register, handleSubmit, reset, setValue } = useForm();
		const {
			messages,
			setMessages,
			sendUploadFile,
			sendMessage,
			messageLoading,
			fileLoading,
			fileResponse,
			activeChat,
		} = useChats();

		const [message, setMessage] = useState("");

		const fileInputRef = useRef(null);
		const textareaRef = useRef(null);

		const onSubmit = () => {
			if (files.length) {
				const formData = new FormData();

				files.forEach((file) => {
					formData.append("media", file);
				});

				localStorage.setItem("uploadMedia", JSON.stringify(activeChat?.id));
				sendUploadFile({ formData });
				setFiles([]);
				reset();
			} else {
				setMessages({
					isEmpty: messages?.isEmpty,
					description: messages?.description,
					messages: [
						...(messages?.messages ?? []),
						{
							id: Date.now().toString(),
							request: {
								message,
								created_at: new Date().toISOString(),
							},
						},
					],
				});

				sendMessage({ message });
				setValue("message", "");
				setMessage("");
				reset();
			}
		};

		const handleInputChange = (event) => {
			const value = event.target.value;
			setMessage(value);
		};

		const handlePinFileButton = () => {
			fileInputRef.current?.click();
		};

		const handleCloseDocument = (id: number) => {
			setFiles((files) => files.filter((item) => item.lastModified !== id));
			fileInputRef.current.value = "";
		};

		const handleKeyDown = (event) => {
			if (event.key === "Enter" && !event.shiftKey) {
				event.preventDefault();
				if (message || files.length) onSubmit();
			}
		};

		const handleTextarea = () => {
			const textarea = textareaRef.current;
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		};

		const mapFilesToString = (files: { file: string }[]): string => {
			return files.map((item: { file: string }) => item.file).join(", ");
		};

		useEffect(() => {
			const storedUpload = localStorage.getItem("uploadMedia");

			if (!storedUpload) return;

			const collectionId = JSON.parse(storedUpload);
			const isCurrentCollection = collectionId === activeChat?.id;

			if (!fileResponse && isCurrentCollection) {
				toast({
					variant: "destructive",
					title: "Загрузка файлов была прервана!",
					description: "Возможно, не все файлы были загружены.",
				});
			}
		}, [fileResponse, activeChat]);

		useEffect(() => {
			if (!fileResponse) return;

			const { duplicates, errors, success } = fileResponse;
			const totalFiles = success.length + duplicates.length + errors.length;

			const hasDuplicates = duplicates.length > 0;
			const hasErrors = errors.length > 0;

			toast({
				title: `Загружено ${success.length} из ${totalFiles}`,
			});

			if (hasDuplicates) {
				toast({
					title: "Некоторые файлы уже были загружены ранее в коллекцию!",
					description: `${mapFilesToString(duplicates)}`,
				});
			}
			if (hasErrors) {
				toast({
					variant: "destructive",
					title: "Некоторые файлы не были загружены!",
					description: `${mapFilesToString(errors)}`,
				});
			}
		}, [fileResponse]);

		return (
			<form
				className="w-full relative flex items-end p-2 lg:p-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				{files.length > 0 ? (
					<FileUpload files={files} handleCloseDocument={handleCloseDocument} />
				) : (
					<textarea
						{...register("message", { required: "Message is required" })}
						ref={(el) => {
							textareaRef.current = el;
							register("message").ref(el);
						}}
						disabled={fileLoading || messageLoading || messages?.isEmpty}
						onInput={handleTextarea}
						placeholder="Введите сообщение..."
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						className="flex w-full resize-none overflow-auto h-[50px] min-h-[50px] max-h-[150px] border-none bg-background p-0 text-sm placeholder:text-muted-foreground focus:border-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 outline-none focus:ring-0 focus:border-transparent"
					/>
				)}
				<div className="end-4 flex items-center">
					<Tooltip>
						<TooltipTrigger asChild>
							{
								<div className="relative ml-3">
									<input
										type="file"
										multiple
										ref={fileInputRef}
										onChange={handleDrop}
										style={{ display: "none" }}
									/>
									<button
										type="button"
										className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 rounded-full p-0"
										data-state="closed"
										onClick={handlePinFileButton}
										disabled={messageLoading || fileLoading}
									>
										<Paperclip size={16} />
									</button>
								</div>
							}
						</TooltipTrigger>
						<TooltipContent
							side="top"
							align="center"
							hidden={false}
							{...{
								children: `Прикрепить файлы (${ALLOWED_EXTENSIONS.join(", ")})`,
								hidden: false,
								className: "hidden md:block",
							}}
						/>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							{
								<button
									type="submit"
									disabled={!message.trim() && !files?.length}
									className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 rounded-full p-0 ms-3"
								>
									{messageLoading || fileLoading ? (
										<Spinner size="small" />
									) : (
										<Play size={16} />
									)}
								</button>
							}
						</TooltipTrigger>
						<TooltipContent
							side="top"
							align="center"
							hidden={false}
							{...{
								children: "Отправить",
								hidden: false,
								className: "hidden md:block",
							}}
						/>
					</Tooltip>
				</div>
			</form>
		);
	},
);
