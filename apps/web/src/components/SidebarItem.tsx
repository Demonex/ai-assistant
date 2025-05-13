import { useNavigate } from "react-router";

import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar.js";

export const SidebarItem = ({ pathname, item }) => {
	const navigate = useNavigate();

	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				tooltip={{
					children: item.name,
					hidden: false,
					className: "hidden md:block",
				}}
				onClick={() => navigate(item.path)}
				isActive={pathname === item.path}
				className="px-2.5 md:px-2"
			>
				{item.icon}
				<span>{item.name}</span>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
};
