"use client";

// import { Field } from "payload";
// import { useState } from "react";

// const CustomUploadField = () => {
// 	const [file, setFile] = useState(null);

// 	const handleFileChange = (event) => {
// 		setFile(event.target.files[0]);
// 		console.log("in upload");

// 		// Handle file upload without showing a modal
// 		// You might use an API call here to upload the file directly
// 	};

// 	return (
// 		<div>
// 			<input type="file" onChange={handleFileChange} multiple />
// 		</div>
// 	);
// };

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { ErrorCode } from "react-dropzone";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { CollectionService } from "@/services/CollectionService";

// import { toast } from "@/components/hooks/use-toast"
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
import { useState } from "react";

// 1 MB
const MAX_FILE_SIZE = 1e6;

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
			CollectionService.filesUpload(Number(collectionId), formData)
				.then(() => {
					form.setValue("files", []);
				})
				.finally(() => {
					form.setValue("files", []);
					setFileLoading(false);
				});
			// sendUploadFile?.({ formData });
		}
	}

	// toast({
	//   title: "You submitted the following values:",
	//   description: (
	//     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
	//       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
	//     </pre>
	//   ),
	// })

	return (
		<Form {...form}>
			<div
				// onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
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
								// toast({
								//   variant: "destructive",
								//   title: "File size too large.",
								//   description: `File '${fileRejection.file.name}' is too large.`,
								// })
							}
						});
					}}
				>
					{({ maxSize }) => (
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
													Browse to upload your file
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
						<h6 className="font-semibold leading-none tracking-tight">{`Files (${fields.length})`}</h6>
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
														Uploading...
													</FileListDescriptionText>
												)}
											</FileListDescription>
										</FileListInfo>
										<FileListAction onClick={() => remove(index)}>
											<X />
											<span className="sr-only">Remove</span>
										</FileListAction>
									</FileListHeader>
								</FileListItem>
							))}
						</FileList>
					</div>
				)}
				<Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
			</div>
		</Form>
	);
};
// Copy
// Description List

export default DropzoneForm;
// export default CustomUploadField;
