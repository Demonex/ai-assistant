import { useLocation, useNavigate } from "react-router";

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
	File,
	FileBox,
	FileDiff,
	FileVolume,
	LayoutGrid,
	Mails,
	MessageCircleMore,
	Network,
	User,
	UserRoundCog,
	Users,
} from "lucide-react";

export function AppSidebar() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const navigateList = [
		{
			name: "Чаты",
			path: "/chat",
			icon: <MessageCircleMore />,
		},
		{
			name: "Сравнение документов",
			path: "/doc-comparison",
			icon: <FileDiff />,
		},
		{
			name: "Транскрибация",
			path: "/transcription",
			icon: <FileVolume />,
		},
		{
			name: "Админ панель",
			path: "/admin",
			icon: <UserRoundCog />,
		},
		{
			name: "Коллекции",
			path: "/collections",
			icon: <Boxes />,
		},
		{
			name: "Нейросервисы",
			path: "/neuro",
			icon: <Atom />,
		},
		{
			name: "Модели",
			path: "/models",
			icon: <FileBox />,
		},
		{
			name: "Пользователи",
			path: "/users",
			icon: <User />,
		},
		{
			name: "Группы",
			path: "/groups",
			icon: <Users />,
		},
		{
			name: "Тенанты",
			path: "/tenats",
			icon: <LayoutGrid />,
		},
		{
			name: "Сообщения",
			path: "/chat-message",
			icon: <Mails />,
		},
		{
			name: "Docs",
			path: "/docs",
			icon: <File />,
		},
		{
			name: "Провайдеры",
			path: "/providers",
			icon: <Network />,
		},
	];

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
								{navigateList.map((item) => (
									<SidebarMenuItem key={item.path}>
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
								))}
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
