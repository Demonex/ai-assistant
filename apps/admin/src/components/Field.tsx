"use client";

import { useState } from "react";
import { ErrorCode } from "react-dropzone";
import { useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Dropzone,
	DropzoneInput,
	DropzoneTitle,
	DropzoneUploadIcon,
	DropzoneZone,
} from "@/components/ui/dropzone";
import {
	FileList,
	FileListAction,
	FileListDescription,
	FileListDescriptionText,
	FileListHeader,
	FileListIcon,
	FileListInfo,
	FileListItem,
	FileListName,
	FileListSize,
} from "@/components/ui/file-list";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { CollectionService } from "@/services/CollectionService";

import "./components.scss";

// 1 MB
const MAX_FILE_SIZE = 1024 * 1024 * 512;

const FormSchema = z.object({
	files: z
		.array(
			z.object({
				file: z
					.instanceof(File)
					.refine(
						(file) => file.size <= MAX_FILE_SIZE,
						"File exceed max file size",
					),
			}),
		)
		.min(1, { message: "Minimum one file is required." }),
});

const DropzoneForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			files: [],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "files",
	});

	const [fileLoading, setFileLoading] = useState(false);

	function onSubmit({ files }: z.infer<typeof FormSchema>) {
		if (files.length) {
			const referer = window.location.href;

			const collectionId = referer.split("/").at(-1);

			const formData = new FormData();

			files.forEach(({ file }) => {
				formData.append("media", file);
			});

			setFileLoading(true);

			CollectionService.filesUpload<{
				duplicates: {
					file: string;
					status: "success" | "duplicates" | "errors";
					message?: string;
				}[];
				errors: {
					file: string;
					status: "success" | "duplicates" | "errors";
					message?: string;
				}[];
				success: {
					file: string;
					status: "success" | "duplicates" | "errors";
					message?: string;
				}[];
			}>(Number(collectionId), formData)
				.then((response) => {
					const mapFilesToString = (files) => {
						return files.map((item: { file: string }) => item.file).join(", ");
					};

					const { duplicates, errors, success } = response;
					const totalFiles = success.length + duplicates.length + errors.length;

					const hasDuplicates = duplicates.length > 0;
					const hasErrors = errors.length > 0;

					// toast('My action toast', {
					// 	action: <Button onClick={() => console.log('Action!')}>Action</Button>,
					// });

					toast.success(`Загружено ${success.length} из ${totalFiles}`);

					if (hasDuplicates) {
						toast.info(
							"Некоторые файлы уже были загружены ранее в коллекцию!",
							{
								description: <div>{mapFilesToString(duplicates)}</div>,
							},
						);
					}
					if (hasErrors) {
						toast.error("Некоторые файлы не были загружены!", {
							description: <div>{mapFilesToString(duplicates)}</div>,
						});
					}

					// toast.success("Документы успешно загружены");
					setFileLoading(false);
				})
				.catch(() => {
					toast.error("При загрузке возникла ошибка");
					setFileLoading(false);
				})
				.finally(() => {
					setTimeout(() => {
						form.setValue("files", []);
					}, 1500);
				});
		}
	}

	function onShowAllDocuments() {
		const referer = window.location.href;

		const collectionId = referer.split("/").at(-1);
		const query = `where[or][0][and][0][collection][equals]=${collectionId}`;

		// setLocation(`/admin/collections/doc?limit=10&page=1&${encodeURI(query)}`)
		window.location.href = `/admin/collections/doc?limit=10&page=1&${encodeURI(query)}`;
	}

	return (
		<Form {...form}>
			<div
				// onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6 rounded-[5px]"
			>
				<Dropzone
					maxSize={MAX_FILE_SIZE}
					onDropAccepted={(acceptedFiles) =>
						append(acceptedFiles.map((file) => ({ file })))
					}
					onDropRejected={(fileRejections) => {
						fileRejections.forEach((fileRejection) => {
							if (
								fileRejection.errors.some(
									(err) => err.code === ErrorCode.FileTooLarge,
								)
							) {
								toast("Слишком большой размер файла!");
							}
						});
					}}
				>
					{({ maxSize: _maxSize }) => (
						<FormField
							control={form.control}
							name="files"
							render={({ field }) => (
								<FormItem className="mt-4">
									{/* <FormLabel>File upload</FormLabel> */}
									<DropzoneZone className="flex justify-center">
										<FormControl>
											<DropzoneInput
												disabled={field.disabled}
												name={field.name}
												onBlur={field.onBlur}
												ref={field.ref}
											/>
										</FormControl>
										<div className="flex items-center gap-6">
											<DropzoneUploadIcon />
											<div className="grid gap-0.5">
												<DropzoneTitle>
													Перетащите файлы сюда или кликните для загрузки.
												</DropzoneTitle>
												{/* <DropzoneDescription>
													{`Maximum file size: ${prettyBytes(maxSize ?? 0)}`}
												</DropzoneDescription> */}
											</div>
										</div>
									</DropzoneZone>
									{/* <FormDescription>Drag and drop is supported.</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</Dropzone>
				{!!fields.length && (
					<div className="grid gap-4">
						<h6 className="font-semibold leading-none tracking-tight">{`Добавлено файлов (${fields.length})`}</h6>
						<FileList>
							{fields.map((field, index) => (
								<FileListItem key={field.id}>
									<FileListHeader>
										<FileListIcon />
										<FileListInfo>
											<FileListName>{field.file.name}</FileListName>
											<FileListDescription>
												<FileListSize>{field.file.size}</FileListSize>
												{fileLoading && (
													<FileListDescriptionText>
														<Loader2 className="size-3 animate-spin" />
														Загрузка...
													</FileListDescriptionText>
												)}
											</FileListDescription>
										</FileListInfo>
										<FileListAction onClick={() => remove(index)}>
											<X />
											<span className="sr-only">Удалить</span>
										</FileListAction>
									</FileListHeader>
								</FileListItem>
							))}
						</FileList>
					</div>
				)}

				<div className="flex gap-2">
					<Button
						style={{ cursor: "pointer", border: "none" }}
						onClick={form.handleSubmit(onSubmit)}
						disabled={fields.length === 0}
					>
						Загрузить
					</Button>
					<Button
						style={{
							background: "#d0d0d0",
							color: "black",
							cursor: "pointer",
							border: "none",
						}}
						onClick={onShowAllDocuments}
					>
						Показать все документы
					</Button>
				</div>
			</div>
		</Form>
	);
};

export default DropzoneForm;
