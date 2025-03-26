import { formatFileSize, getColorFile } from "@/helpers/index.js";
import { memo } from "react";

export const FileUpload = memo<{
	files: File[];
	handleCloseDocument: (id: number) => void;
}>(({ files, handleCloseDocument }) => {
	return (
		<div className="w-full flex flex-wrap gap-2">
			{files.map((file) => (
				<div
					key={file.lastModified}
					className="relative flex w-40 rounded-md border border-slate-100 text-xs shadow shadow-slate-200"
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
							onClick={() => handleCloseDocument(file.lastModified)}
							className="absolute right-0 top-0 z-10 -translate-y-2 translate-x-2 cursor-pointer rounded-full bg-white p-1 shadow shadow-slate-200 hover:bg-stone-100"
						>
							<span>
								<svg
									aria-hidden="true"
									className="h-2 w-2 fill-stone-500"
									preserveAspectRatio="none"
									viewBox="0 0 1024 1024"
								>
									<path
										clipRule="evenodd"
										d="M587.19 506.246l397.116-397.263a52.029 52.029 0 0 0 0-73.143l-2.194-2.194a51.98 51.98 0 0 0-73.143 0l-397.068 397.8-397.068-397.8a51.98 51.98 0 0 0-73.143 0l-2.146 2.194a51.054 51.054 0 0 0 0 73.143l397.069 397.263L39.544 903.461a52.029 52.029 0 0 0 0 73.142l2.146 2.195a51.98 51.98 0 0 0 73.143 0L511.9 581.583l397.068 397.215a51.98 51.98 0 0 0 73.143 0l2.194-2.146a52.029 52.029 0 0 0 0-73.143L587.19 506.246z"
										fillRule="evenodd"
									/>
								</svg>
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
});
