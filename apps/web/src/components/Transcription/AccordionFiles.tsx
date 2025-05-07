import { type FC } from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@repo/web/components/ui/accordion.js";
import { toast } from "@repo/web/hooks/use-toast.js";
import type { FileTranscriptionType } from "@repo/web/types/types.js";
import { Copy } from "lucide-react";

import { ReactMarkdownComponent } from "@/components/ReactMarkdownComponent.js";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip.js";

type AccordionFilesProps = {
	files: FileTranscriptionType[];
};

export const AccordionFiles: FC<AccordionFilesProps> = ({ files }) => {
	const downloadFile = (file: FileTranscriptionType) => {
		const content =
			`Протокол:\n${file.fullText}\n\nТранскрибация:${file.transciption}`.trim();

		const blob = new Blob([content], { type: "text/plain" });

		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${file.file}_transcription.txt`;

		link.click();

		URL.revokeObjectURL(url);
	};

	const handleCopy = async (text: string) => {
		const textArea = document.createElement("textarea");

		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("copy");
		document.body.removeChild(textArea);

		toast({
			title: "Протокол cкопирован!",
		});
	};

	if (!files && !files.length) return;

	return (
		<Accordion type="single" collapsible className="w-full">
			{files.map((file, index) => (
				<AccordionItem className="px-4 relative" value={`${index}`} key={index}>
					<AccordionTrigger>Транскрибация файла - {file.file}</AccordionTrigger>

					<AccordionContent>
						<div className="flex items-center justify-between w-full mb-2">
							<button
								onClick={() => {
									downloadFile(file);
								}}
								className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
							>
								Скачать документ
							</button>

							<div className="flex items-center cursor-pointer rounded-lg border bg-card text-card-foreground p-2">
								<Tooltip>
									<TooltipTrigger asChild>
										<div
											className="hover:opacity-80"
											onClick={() => handleCopy(file.fullText)}
										>
											<Copy size={16} />
										</div>
									</TooltipTrigger>
									<TooltipContent
										side="top"
										align="center"
										hidden={false}
										{...{
											children: "Копировать протокол",
											hidden: false,
											className: "hidden md:block",
										}}
									/>
								</Tooltip>
							</div>
						</div>

						<div className="py-4">
							<ReactMarkdownComponent textMarkdown={file.fullText} />
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
};
