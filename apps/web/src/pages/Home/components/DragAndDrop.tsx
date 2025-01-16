import { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import DragDrop from "@uppy/drag-drop";
import XHRUpload from "@uppy/xhr-upload";
import ProgressBar from "@uppy/progress-bar";
import "@uppy/progress-bar/dist/style.min.css";

export const DragAndDrop = () => {
	const [progress, setProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const [uppy] = useState(
		() =>
			new Uppy({
				meta: {},
				restrictions: {
					maxNumberOfFiles: 1,
					allowedFileTypes: ["image/*", ".pdf"],
				},
			}),
	);
	//   useEffect(() => {
	//     uppy.use(DragDrop, {
	//       target: "#dragdrop",
	//       width: "100%",
	//       height: "300px",
	//       note: "Drag and drop images or PDF files here",
	//     });
	//     uppy.use(XHRUpload, {
	//       endpoint: "/api/upload",
	//       formData: true,
	//       fieldName: "files[]",
	//     });
	//     uppy.use(ProgressBar, {
	//       target: "#progressBar",
	//       fixed: true,
	//     });
	//     uppy.on("upload-progress", (file, progress) => {
	//       setProgress(+progress);
	//       setIsUploading(true);
	//     });
	//     uppy.on("complete", () => {
	//       setIsUploading(false);
	//       setProgress(0);
	//     });
	//     return () => {
	//       uppy.destroy();
	//     };
	//   }, []);
	//   return (
	//     <div className="flex flex-col items-center justify-center h-screen">
	//       <div id="dragdrop"></div>
	//       {isUploading && <div id="progressBar"></div>}
	//     </div>
	//   );
	useEffect(() => {
		uppy.use(DragDrop, {
			target: "#dragdrop-container",
			width: "70vw",
			height: "80vh",
			locale: {
				strings: {
					dropHereOr: "Перетащите файл сюда",
				},
				pluralize: (n: number): number => {
					throw new Error("Function not implemented.");
				},
			},
			onDragOver(event) {
				console.log("Файл перетаскивается", event);
			},
			onDragLeave(event) {
				console.log("Файл вышел из зоны перетаскивания", event);
			},
			onDrop(event) {
				console.log("Файл был добавлен", event);
			},
		});
		return () => {
			//   uppy.close();
		};
	}, []);
	return (
		<>
			<div
				id="dragdrop-container"
				className="bg-rgb(39, 39, 42) border border-gray-700 rounded-lg cursor-pointer"
			></div>
			{/* <ProgressBar uppy={uppy} /> */}
		</>
	);
};

// import { useEffect, useState, useRef } from "react";
// import Uppy from "@uppy/core";
// import DragDrop from "@uppy/drag-drop";
// import XHRUpload from "@uppy/xhr-upload";
// import ProgressBar from "@uppy/progress-bar";
// import { ProgressBar as ProgressBarComponent } from "@uppy/react";
// import "@uppy/progress-bar/dist/style.min.css";

// export const DragAndDrop = () => {
//   const [progress, setProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const uppyRef = useRef(null);

//   useEffect(() => {
//     if (!uppyRef.current) {
//       uppyRef.current = new Uppy({
//         meta: {},
//         restrictions: {
//           maxNumberOfFiles: 1,
//           allowedFileTypes: ["image/*", ".pdf"],
//         },
//         autoProceed: true,
//       });

//       uppyRef.current.use(DragDrop, {
//         target: "#dragdrop",
//         width: "70vw",
//         height: "80vh",
//         note: "Drag and drop images or PDF files here",
//       });

//       uppyRef.current.use(XHRUpload, {
//         endpoint: "/api/upload",
//         formData: true,
//         fieldName: "files[]",
//       });

//       uppyRef.current.use(ProgressBar, {
//         target: "#progressBar",
//         fixed: true,
//         hideAfterFinish: false,
//       });

//       uppyRef.current.on("upload-progress", (file, progress) => {
//         console.log("Upload progress:", progress);
//         setProgress(+progress);
//         setIsUploading(true);
//       });

//       uppyRef.current.on("drag-over", () => {
//         console.log("Заработало");
//       });

//       uppyRef.current.on("complete", () => {
//         setIsUploading(false);
//         setProgress(0);
//       });
//     }

//     return () => {
//       if (uppyRef.current) {
//         uppyRef.current.destroy();
//         uppyRef.current = null;
//       }
//     };
//   }, []);

//   // Эмуляция прогресса для тестирования
//   useEffect(() => {
//     if (!isUploading) return;

//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setIsUploading(false);
//           return 0;
//         }
//         return prev + 10;
//       });
//     }, 500);

//     return () => clearInterval(interval);
//   }, [isUploading]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <div
//         id="dragdrop"
//         className="bg-rgb(39, 39, 42) border border-gray-700 rounded-lg cursor-pointer"
//       ></div>
//       <div
//         id="progressBar"
//         style={{ display: isUploading ? "block" : "none" }}
//       ></div>
//     </div>
//   );
// };
