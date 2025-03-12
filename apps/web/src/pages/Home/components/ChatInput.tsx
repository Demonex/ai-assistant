import { memo } from "react";
import { useForm } from "react-hook-form";
import { FileUpload } from "./FileUpload.js";
import { Spinner } from "./Spinner.js";
import type { ChatInputProps } from "@/types/types.js";
import { useChats } from "../hooks/useChats.js";

export const ChatInput = memo<ChatInputProps>(
	({
		onSubmit,
		messageLoading,
		files,
		handleCloseDocument,
		handleTextarea,
		handleInputChange,
		textareaRef,
		handleDrop,
		handlePinFileButton,
		message,
		fileInputRef,
	}) => {
		const { register, handleSubmit } = useForm();
		const { messages } = useChats();

		const handleKeyDown = (event) => {
			if (event.key === "Enter" && !event.shiftKey) {
				event.preventDefault();
				if (message || files.length) handleSubmit(onSubmit)();
			}
		};

		return (
			<form
				className="w-full relative flex items-center p-2 lg:p-4"
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
						disabled={messageLoading || messages?.isEmpty}
						onInput={handleTextarea}
						placeholder={"Введите сообщение..."}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						className="flex w-full resize-none overflow-auto h-[50px] max-h-[150px] rounded-md border-none bg-background p-0 text-sm placeholder:text-muted-foreground focus:border-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					/>
				)}
				<div className="end-4 flex items-center">
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
							className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-11 w-11 rounded-full p-0"
							data-state="closed"
							onClick={handlePinFileButton}
							disabled={messageLoading}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-paperclip h-4 w-4"
							>
								<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
							</svg>
						</button>
					</div>
					<button
						type="submit"
						disabled={!message && !files?.length}
						className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ms-3"
					>
						{messageLoading ? <Spinner /> : "Отправить"}
					</button>
				</div>
			</form>
		);
	},
);
