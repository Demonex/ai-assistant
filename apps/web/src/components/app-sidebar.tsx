import { useNavigate } from "react-router";

import { NavUser } from "@repo/web/components/nav-user.js";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@repo/web/components/ui/sidebar.js";
import {
	Atom,
	Boxes,
	Command,
	MessageCircleMore,
	UserRoundCog,
} from "lucide-react";

export function AppSidebar({ isAdminPage = false }) {
	const navigate = useNavigate();

	return (
		<Sidebar>
			<Sidebar
				collapsible="none"
				className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
			>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
								<a href="/">
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
										<Command className="size-4" />
									</div>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">ChatDoc</span>
										<span className="truncate text-xs">Sigma</span>
									</div>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent className="px-1.5 md:px-0">
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton
										tooltip={{
											children: "Чаты",
											hidden: false,
											className: "hidden md:block",
										}}
										onClick={() => navigate("chat")}
										isActive={!isAdminPage}
										className="px-2.5 md:px-2"
									>
										<MessageCircleMore />
										<span>Чаты</span>
									</SidebarMenuButton>
								</SidebarMenuItem>

								<SidebarMenuItem>
									<SidebarMenuButton
										tooltip={{
											children: "Админ панель",
											hidden: false,
											className: "hidden md:block",
										}}
										onClick={() => navigate("/admin")}
										isActive={isAdminPage}
										className="px-2.5 md:px-2"
									>
										<UserRoundCog />
										<span>Админ панель</span>
									</SidebarMenuButton>
								</SidebarMenuItem>

								<SidebarMenuItem>
									<SidebarMenuButton
										tooltip={{
											children: "Коллекции",
											hidden: false,
											className: "hidden md:block",
										}}
										onClick={() => navigate("/collections")}
										isActive={isAdminPage}
										className="px-2.5 md:px-2"
									>
										<Boxes />
										<span>Коллекции</span>
									</SidebarMenuButton>
								</SidebarMenuItem>

								<SidebarMenuItem>
									<SidebarMenuButton
										tooltip={{
											children: "Нейросервисы",
											hidden: false,
											className: "hidden md:block",
										}}
										onClick={() => navigate("/Neuro")}
										className="px-2.5 md:px-2"
									>
										<Atom />
										<span>Нейросервисы</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>

				<SidebarFooter>
					<NavUser />
				</SidebarFooter>
			</Sidebar>
		</Sidebar>
	);
}
