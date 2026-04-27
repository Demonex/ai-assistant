import { memo } from "react";

import { formatFileSize, getColorFile } from "@repo/web/helpers/index.js";
import { X } from "lucide-react";

export const FileUpload = memo<{
	width?: string;
	files: File[];
	handleCloseDocument: (id: number) => void;
}>(({ width = "10", files, handleCloseDocument }) => {
	return (
		<div className="w-full flex flex-wrap gap-2">
			{files.map((file) => (
				<div
					style={{ width: width + "rem" }}
					key={file.lastModified}
					className="relative flex rounded-md border border-slate-100 text-xs shadow shadow-slate-200"
				>
					<div
						style={{
							backgroundColor: getColorFile(file.name.split(".").pop()),
						}}
						aria-hidden="true"
						className="grid h-12 w-12 flex-shrink-0 place-items-center truncate rounded-bl-md rounded-tl-md font-medium uppercase text-white"
					>
						{file.name.split(".").pop()}
					</div>
					<div className="min-w-0 px-3 py-2">
						<p className="truncate">{file.name}</p>
						<div className="text-gray-500">{formatFileSize(file.size)}</div>
						<div
							onClick={() => {
								handleCloseDocument(file.lastModified);
							}}
							className="absolute right-0 top-0 z-10 -translate-y-2 translate-x-2 cursor-pointer rounded-full bg-white p-1 shadow shadow-slate-200 hover:bg-stone-100"
						>
							<X size={12} />
						</div>
					</div>
				</div>
			))}
		</div>
	);
});
