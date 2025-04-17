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
		// Документы
		pdf: "#ff4b4b",
		doc: "#2b579a",
		docx: "#2b579a",
		xlsx: "#217346",
		txt: "#607d8b",

		// Изображения
		jpg: "#ff9800",
		png: "#2196f3",
		gif: "#ff4081",
		webp: "#00bcd4",

		// Видео
		mp4: "#ff5252",
		m4v: "#ff6e6e",
		mp4v: "#ff8a8a",
		mpg4: "#ffa7a7",
		webm: "#7c4dff",

		// Аудио
		wav: "#4caf50",
		wave: "#66bb6a",
		mp3: "#9c27b0",
		mp2: "#ba68c8",
		mpga: "#ce93d8",
		mpeg: "#e1bee7",
		m4a: "#ff7043",
		mp4a: "#ff8a65",
		aac: "#ffab91",
		ogg: "#00acc1",
		oga: "#26c6da",
		opus: "#80deea",
	};

	return colors[ext.toLowerCase()] || "#ddd";
};
