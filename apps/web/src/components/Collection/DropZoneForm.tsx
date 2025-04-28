import { useRef, useState } from "react";

import {
	ALLOWED_EXTENSIONS_MEDIA,
	ALLOWED_EXTENSIONS_TEXT,
	EXTENSIONS_TYPES,
} from "@/constants/index.js";
import { toast } from "@/hooks/use-toast.js";

import { FileUpload } from "../FileUpload.js";
import { Button } from "../ui/button.js";

//TODO отрефакторить компонент
export const DropZoneForm = () => {
	const [files, setFiles] = useState([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleDrop = (event) => {
		event.preventDefault();
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
	};

	const filterAllowedFiles = (files: File[]): File[] => {
		return files.filter((file) => isFileAllowed(file.type));
	};

	const isFileAllowed = (fileType: string): boolean => {
		return !!fileType && EXTENSIONS_TYPES.includes(fileType);
	};

	const getUniqueFiles = (existingFiles: File[], newFiles: File[]): File[] => {
		const existingFileNames = new Set(existingFiles.map((file) => file.name));
		return newFiles.filter((file) => !existingFileNames.has(file.name));
	};

	const handleCloseDocument = (id: number) => {
		setFiles((files) => files.filter((item) => item.lastModified !== id));
		fileInputRef.current.value = "";
	};

	const onUploadFile = () => {
		//TODO: исправить хук
		// sendUploadFile();
		setFiles([]);
	};

	return (
		<>
			<div
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className="border-2 border-black-800 border-dashed top-0 py-10 left-0 w-full h-full bg-white bg-opacity-90 flex flex-col items-center justify-center text-black z-[2] cursor-pointer"
				onClick={handleClick}
			>
				<div className="max-w-[70%]">
					<div className="text-xl font-semibold mb-2">
						Перетащите файлы в эту область или кликните для загрузки
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
				<input
					type="file"
					multiple
					ref={fileInputRef}
					className="hidden"
					onChange={handleDrop}
				/>
			</div>
			{!!files.length && (
				<div>
					<h6 className="font-semibold leading-none tracking-tight my-6">{`Добавлено файлов (${files.length})`}</h6>
					<FileUpload files={files} handleCloseDocument={handleCloseDocument} />
				</div>
			)}
			<Button disabled={!!!files.length} onClick={onUploadFile}>
				Загрузить
			</Button>
		</>
	);
};
