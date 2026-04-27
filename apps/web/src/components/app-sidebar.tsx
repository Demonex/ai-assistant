import { useLocation } from "react-router";

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

import { useProfile } from "@/hooks/useProfile.js";

import { SidebarItem } from "./SidebarItem.js";

export function AppSidebar() {
	const { pathname } = useLocation();

	const { dataProfile } = useProfile();

	console.log(dataProfile.superadmin);

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
	];

	const adminList = [
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
								{/* TODO Убрать фильтр, когда будет готова админка */}
								{navigateList
									.filter((item) => {
										if (
											!dataProfile.superadmin &&
											item.name === "Админ панель"
										) {
											return false;
										}
										return true;
									})
									.map((item) => (
										<SidebarItem
											key={item.path}
											item={item}
											pathname={pathname}
										/>
									))}
								<hr className="my-2 border-gray-200 dark:border-gray-700" />
								{/* TODO Убрать проверку, когда будет готова админка */}
								{window.location.host === "localhost:2051" &&
									adminList.map((item) => (
										<SidebarItem
											key={item.path}
											item={item}
											pathname={pathname}
										/>
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
