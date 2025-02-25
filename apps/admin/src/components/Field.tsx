"use client";

import { Field } from "payload";
import { useState } from "react";

const CustomUploadField = () => {
	const [file, setFile] = useState(null);

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
		console.log("in upload");

		// Handle file upload without showing a modal
		// You might use an API call here to upload the file directly
	};

	return (
		<div>
			<input type="file" onChange={handleFileChange} multiple />
		</div>
	);
};

export default CustomUploadField;
