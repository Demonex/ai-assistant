import { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import DragDrop from "@uppy/drag-drop";
import XHRUpload from "@uppy/xhr-upload";
// import ProgressBar from "react-tailwindcss-progress-bar";
import { DragDrop as DragDropComponent, ProgressBar } from "@uppy/react";

export const DragAndDrop = () => {
	//   const [uppy] = useState(() =>
	//     new Uppy().use(DragDrop, {
	//       id: "DragDropPlugin",
	//     })
	//   );
	//   return (
	//     <div className="bgwhite text-white w-600">
	//       <DragDropComponent
	//         uppy={uppy}
	//         // className="w-full h-full bg-transparent border-2 border-white rounded-lg"
	//       />
	//       <ProgressBar uppy={uppy} />
	//     </div>
	//   );
	///////////////////////////////////////////////////////////////////////////////////
	const [progress, setProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const uppy = new Uppy({
		meta: {},
		restrictions: {
			maxNumberOfFiles: 1,
			allowedFileTypes: ["image/*", ".pdf"],
		},
	});

	uppy.use(DragDrop, {
		target: "#dragdrop",
		width: "100%",
		height: "300px",
		note: "Drag and drop images or PDF files here",
	});

	uppy.use(XHRUpload, {
		endpoint: "/api/upload",
		formData: true,
		fieldName: "files[]",
	});

	uppy.on("upload-progress", (file, progress) => {
		setProgress(progress);
		setIsUploading(true);
	});

	uppy.on("complete", () => {
		setIsUploading(false);
		setProgress(0);
	});

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div id="dragdrop"></div>
			{isUploading && (
				<ProgressBar
					percentage={progress}
					height="6px"
					className="mt-4 w-full"
				/>
			)}
		</div>
	);
	//   useEffect(() => {
	//     uppy.use(DragDrop, {
	//       target: "#dragdrop-container",
	//       width: "70vw",
	//       height: "80vh",
	//       locale: {
	//         strings: {
	//           dropHereOr: "Перетащите файл сюда",
	//         },
	//         pluralize: function (n: number): number {
	//           throw new Error("Function not implemented.");
	//         },
	//       },
	//       onDragOver(event) {
	//         console.log("Файл перетаскивается", event);
	//       },
	//       onDragLeave(event) {
	//         console.log("Файл вышел из зоны перетаскивания", event);
	//       },
	//       onDrop(event) {
	//         console.log("Файл был добавлен", event);
	//       },
	//     });
	//     return () => {
	//       //   uppy.close();
	//     };
	//   }, []);

	//   return (
	//     <>
	//       <div
	//         id="dragdrop-container"
	//         className="bg-rgb(39, 39, 42) border border-gray-700 rounded-lg cursor-pointer"
	//       ></div>
	//       <ProgressBar uppy={uppy} />
	//     </>
	//   );
};
