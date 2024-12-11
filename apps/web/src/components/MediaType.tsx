type MediaType = {
	type: "Статьи" | "Rifify" | "Новости";
	color: "#1FD660" | "#E4FF29" | "#FF4633";
};
export const MediaType = ({ type, color }: MediaType) => {
	return (
		<div
			style={{
				backgroundColor: ` ${color}`,
			}}
			className="py-1 px-2.5 rounded-md flex items-center justify-center w-fit"
		>
			<span className="text-captionText text-[black] font-medium">{type}</span>
		</div>
	);
};
