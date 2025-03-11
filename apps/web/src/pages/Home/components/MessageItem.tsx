import { memo } from "react";
import { useChats } from "../hooks/useChats.js";
import { AvatarComponent } from "./AvatarComponent.js";
import { DropdownMenuButton } from "./DropdownMenuButton.js";
import { useTheme } from "@/components/theme-provider.js";

export const MessageItem = memo<{
	title: string;
	id: number;
}>(({ title, id }) => {
	const { activeChat, setActiveChat } = useChats();
	const { theme } = useTheme();

	return (
		<div
			className={`group relative flex min-w-0 cursor-pointer items-center gap-4 px-6 py-4 hover:bg-muted ${theme === "dark" ? (activeChat?.id === id ? "bg-[rgb(39,39,42)] text-white border-r-[3px]" : "bg-transparent") : activeChat?.id === id ? "bg-[rgb(244,244,244)] text-black border-r-[3px] border-black" : "bg-transparent"}`}
			onClick={() => {
				setActiveChat({ id, title });
			}}
		>
			<span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 border">
				<div className="w-3 h-3 absolute rounded-full end-0 bottom-0 bg-green-400" />
				<span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
					<AvatarComponent />
				</span>
			</span>
			<div className="min-w-0 flex-grow">
				<div className="flex justify-between">
					<span className="font-semibold">{title}</span>
				</div>
			</div>
			{/* <div className="absolute bottom-0 end-0 top-0 flex items-center bg-gradient-to-l from-50% px-4 opacity-0 group-hover:opacity-100 from-muted">
        <DropdownMenuButton />
      </div> */}
		</div>
	);
});
