import { type ComponentProps, useEffect, useState } from "react";

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
	useSidebar,
} from "@repo/web/components/ui/sidebar.js";
import { useProfile } from "@repo/web/hooks/useProfile.js";
import { Command, MessageCircleMore, UserRoundCog } from "lucide-react";
import { navigate } from "wouter/use-browser-location";

export function AppSidebar() {
	// Note: I'm using state to show active item.
	// IRL you should use the url/router.
	const [nav, setNav] = useState([
		{
			id: Date.now(),
			title: "Чаты",
			icon: MessageCircleMore,
			isActive: true,
			isAdmin: false,
		},
	]);
	const { setOpen } = useSidebar();
	const { profile } = useProfile();

	const toggleMenuItem = (item) => {
		window.location.href = "http://localhost:2051/admin";

		setOpen(true);
	};

	useEffect(() => {
		setNav((prev) => {
			if (profile?.superadmin && !prev.some((item) => item.isAdmin)) {
				return [
					...prev,
					{
						id: Date.now(),
						title: "Админ",
						icon: UserRoundCog,
						isActive: false,
						isAdmin: true,
					},
				];
			}
			return prev;
		});
	}, [profile?.superadmin]);

	return (
		<Sidebar>
			{/* This is the first sidebar */}
			{/* We disable collapsible and adjust width to icon. */}
			{/* This will make the sidebar appear as icons. */}
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
										<span className="truncate font-semibold">Acme Inc</span>
										<span className="truncate text-xs">Enterprise</span>
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
								{nav.map((item) => (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											tooltip={{
												children: item.title,
												hidden: false,
												className: "hidden md:block",
											}}
											onClick={() => toggleMenuItem(item)}
											isActive={item.isActive}
											className="px-2.5 md:px-2"
										>
											<item.icon />
											<span>{item.title}</span>
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
