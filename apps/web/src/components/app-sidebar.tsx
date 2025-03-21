import { type ComponentProps, useMemo } from "react";
import _globalThis from "globalthis";
import { Command, MessageCircleMore, UserRoundCog } from "lucide-react";
import { useProfile } from "@repo/web/hooks/useProfile.js";

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

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
	// Note: I'm using state to show active item.
	// IRL you should use the url/router.
	const { profile } = useProfile();
	// const [location, setLocation] = useLocation();
	const nav = useMemo(
		() => [
			{
				title: "Чаты",
				path: "/chats",
				icon: MessageCircleMore,
				isActive: true,
			},
			...(profile?.superadmin
				? [
						{
							title: "Админ",
							path: "/admin",
							icon: UserRoundCog,
						},
					]
				: []),
		],
		[profile?.superadmin, location],
	);

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
									<SidebarMenuItem key={item.path}>
										<SidebarMenuButton
											tooltip={{
												children: item.title,
												hidden: false,
												className: "hidden md:block",
											}}
											onClick={() => {
												if (_globalThis()?.location?.pathname) {
													_globalThis().location.pathname = item.path;
												}
											}}
											isActive={/*location*/ "true" === item.path}
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
