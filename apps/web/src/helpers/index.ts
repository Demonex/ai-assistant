export const formatLocalTime = (
	date: Date | string,
	format: "time" | "date",
) => {
	let formatOptions: Intl.DateTimeFormatOptions;
	if (format === "time") {
		formatOptions = {
			hour: "2-digit",
			minute: "2-digit",
		};
	} else {
		formatOptions = {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		};
	}
	const parsedDate = new Date(date);
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const formatted = new Intl.DateTimeFormat("ru-RU", {
		...formatOptions,
		timeZone: userTimeZone,
	}).format(parsedDate);

	return formatted;
};

export const formatFileSize = (size: number) => {
	if (size < 1024) {
		return `${size} B`;
	}
	if (size < 1024 * 1024) {
		return `${Math.round(size / 1024)} KB`;
	}
	if (size < 1024 * (1024 * 1024)) {
		return `${Math.round(size / (1024 * 1024))} MB`;
	}
	return `${Math.round(size / (1024 * 1024 * 1024))} GB`;
};

export const getColorFile = (ext: string) => {
	const colors = {
		pdf: "#ff4b4b",
		doc: "#007bff",
		docx: "#007bff",
		xlsx: "#217346",
		txt: "#607d8b",
		jpg: "#ff9800",
		png: "#2196f3",
	};

	return colors[ext.toLowerCase()] || "#ddd";
};
