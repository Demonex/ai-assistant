import { useState, useEffect } from "react";

const useLocalTimeFormat = (
	date: Date,
	formatOptions: Intl.DateTimeFormatOptions = {
		hour: "2-digit",
		minute: "2-digit",
	},
) => {
	const [localTime, setLocalTime] = useState("");

	useEffect(() => {
		if (!date) return;

		const parsedDate = new Date(date);
		const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		const formatted = new Intl.DateTimeFormat("ru-RU", {
			...formatOptions,
			timeZone: userTimeZone,
		}).format(parsedDate);

		setLocalTime(formatted);
	}, [date]);

	return localTime;
};

export default useLocalTimeFormat;
