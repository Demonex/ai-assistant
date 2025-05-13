import { useEffect, useRef, useState } from "react";

// import { transcriptionMockData } from "@/DataBase.js";
import {
	ALLOWED_EXTENSIONS_MEDIA,
	EXTENSIONS_TYPES_MEDIA,
} from "@/constants/index.js";
import { toast } from "@/hooks/use-toast.js";
import { useTranscription } from "@/hooks/useTranscription.js";
import { FileTranscriptionResponseType } from "@/types/types.js";

import { FileUpload } from "../FileUpload.js";
import { Spinner } from "../Spinner.js";
import { Button } from "../ui/button.js";
import { AccordionFiles } from "./AccordionFiles.js";

export const TranscriptionForm = () => {
	const {
		handleTranscriptionDocs,
		clearTranscriptionCache,
		pendingTranscription,
	} = useTranscription();

	const fileInputRef = useRef(null);
	const [files, setFiles] = useState([]);
	const [dataTranscription, setDataTranscription] = useState([]);
	// const [dataTranscription, setDataTranscription] = useState(transcriptionMockData);

	const onSubmit = () => {
		if (files.length) {
			const formData = new FormData();

			files.forEach((file) => {
				formData.append("media", file);
			});

			localStorage.setItem("uploadMedia", "pending");

			handleTranscriptionDocs(formData, {
				onSuccess: async (data: ResponseType) => {
					const typedData = data as unknown as FileTranscriptionResponseType;

					if (typedData.success) {
						setDataTranscription(typedData.success);
					} else clearTranscriptionCache();

					notificationDowloadMedia(typedData);
					setFiles([]);
				},
				onError: async (e) => {
					toast({
						variant: "destructive",
						title: e.statusCode.toString(),
						description: e.message,
					});
				},
				onSettled: async () => localStorage.removeItem("uploadMedia"),
			});
		} else {
			clearTranscriptionCache();
			setDataTranscription([]);
			setFiles([]);
		}
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const handleCloseDocument = (id: number) => {
		setFiles((files) => files.filter((item) => item.lastModified !== id));
		fileInputRef.current.value = "";
	};

	const isFileAllowed = (fileType: string): boolean => {
		return !!fileType && EXTENSIONS_TYPES_MEDIA.includes(fileType);
	};

	const filterAllowedFiles = (files: File[]): File[] => {
		return files.filter((file) => isFileAllowed(file.type));
	};

	const getUniqueFiles = (existingFiles: File[], newFiles: File[]): File[] => {
		const existingFileNames = new Set(existingFiles.map((file) => file.name));
		return newFiles.filter((file) => !existingFileNames.has(file.name));
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleDragLeave = (event) => {
		event.preventDefault();
	};

	const handleDrop = (event) => {
		event.preventDefault();

		if (pendingTranscription) return;

		const newFiles: File[] = Array.from(
			event.dataTransfer?.files || event.target?.files,
		);

		const filteredFiles = filterAllowedFiles(newFiles);

		if (filteredFiles.length < newFiles.length) {
			toast({
				variant: "destructive",
				title: "Ошибка формата!",
				description:
					"Некоторые файлы имеют недопустимый формат и не были добавлены.",
			});
		}

		if (filteredFiles.length) {
			setFiles((prevFiles) => {
				const uniqueNewFiles = getUniqueFiles(prevFiles, filteredFiles);
				return [...prevFiles, ...uniqueNewFiles];
			});
		}
	};

	const mapFilesToString = (files: { file: string }[]): string => {
		return files.map((item: { file: string }) => item.file).join(", ");
	};

	const notificationDowloadMedia = (media) => {
		const { errors, success } = media;
		const successCount = success?.length || 0;
		const errorsCount = errors?.length || 0;
		const totalFiles = successCount + errorsCount;
		const hasErrors = errorsCount > 0;

		toast({
			title: `Транскрибировано ${successCount} из ${totalFiles}`,
		});

		if (hasErrors) {
			toast({
				variant: "destructive",
				title: "Некоторые файлы не были транскрибированы!",
				description: `${mapFilesToString(errors)}`,
			});
		}
	};

	useEffect(() => {
		const storedUpload = localStorage.getItem("uploadMedia");

		if (!storedUpload) return;

		toast({
			variant: "destructive",
			title: "Загрузка файлов была прервана!",
		});
		localStorage.removeItem("uploadText");
	}, []);

	return (
		<div className="h-full">
			<h1 className="text-2xl text-center font-bold mb-6">
				Загрузите аудио/видео файлы для преобразования в текст
			</h1>

			<div className="mb-2 max-h-[calc(100vh-12rem)] overflow-auto shadow-base rounded-lg border bg-card text-card-foreground">
				{dataTranscription.length ? (
					<AccordionFiles files={dataTranscription} />
				) : (
					<div className="w-full rounded-lg h-full items-center justify-center text-black">
						<div
							onDragOver={handleDragOver}
							onDrop={handleDrop}
							onDragLeave={handleDragLeave}
							onClick={handleClick}
							className="flex justify-center w-full h-full px-5 py-10 flex-col cursor-pointer"
						>
							<div className="text-xl font-semibold mb-2">
								Перетащите файлы в эту область или кликните
							</div>

							<div className="flex flex-col text-sm">
								<div>
									Доступные форматы:{" "}
									<span className="font-semibold">
										{ALLOWED_EXTENSIONS_MEDIA.join(", ")}
									</span>
								</div>
							</div>
						</div>

						<input
							type="file"
							multiple
							disabled={pendingTranscription}
							ref={fileInputRef}
							className="hidden"
							onChange={handleDrop}
						/>

						{files.length > 0 && (
							<div className="p-5 w-full">
								<FileUpload
									width="30"
									files={files}
									handleCloseDocument={handleCloseDocument}
								/>
							</div>
						)}
					</div>
				)}
			</div>

			<div className="flex itmes-center">
				<Button
					type="button"
					disabled={
						(!files.length && !dataTranscription.length) || pendingTranscription
					}
					onClick={onSubmit}
				>
					{dataTranscription.length
						? "Загрузить новые файлы"
						: "Транскрибировать"}
				</Button>
				{pendingTranscription && <Spinner size="small" className="ml-2" />}
			</div>
		</div>
	);
};
