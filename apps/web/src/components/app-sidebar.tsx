import { type ComponentProps, useState, useMemo, useEffect } from "react";
import { Command, Inbox, UserRoundCog } from "lucide-react";

import { useProfile } from "@/hooks/useProfile.js";

import { NavUser } from "@/components/nav-user.js";
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
} from "@/components/ui/sidebar.js";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	// Note: I'm using state to show active item.
	// IRL you should use the url/router.
	const [nav, setNav] = useState([
		{
			id: Date.now(),
			title: "Inbox",
			url: "",
			icon: Inbox,
			isActive: true,
			isAdmin: false,
		},
	]);
	const { setOpen } = useSidebar();
	const { profile } = useProfile();

	const toggleMenuItem = (id: number) => {
		setNav((prev) => prev.map((el) => ({ ...el, isActive: el.id === id })));
		setOpen(true);
	};

	useEffect(() => {
		setNav((prev) => {
			if (profile.superadmin && !prev.some((item) => item.isAdmin)) {
				return [
					...prev,
					{
						id: Date.now(),
						title: "Admin",
						url: "http://localhost:2055/admin",
						icon: UserRoundCog,
						isActive: false,
						isAdmin: true,
					},
				];
			}
			return prev;
		});
	}, [profile.superadmin]);

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
								<a href="#">
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
											}}
											onClick={() => toggleMenuItem(item.id)}
											isActive={item.isActive}
											className="px-2.5 md:px-2"
											asChild={item.isAdmin}
										>
											{item.isAdmin ? (
												<a href={item.url}>
													<item.icon />
													<span>{item.title}</span>
												</a>
											) : (
												<>
													<item.icon />
													<span>{item.title}</span>
												</>
											)}
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
