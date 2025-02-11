export const formatLocalTime = (
	date: Date,
	formatOptions: Intl.DateTimeFormatOptions = {
		hour: "2-digit",
		minute: "2-digit",
	},
) => {
	const parsedDate = new Date(date);
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const formatted = new Intl.DateTimeFormat("ru-RU", {
		...formatOptions,
		timeZone: userTimeZone,
	}).format(parsedDate);

	return formatted;
};
