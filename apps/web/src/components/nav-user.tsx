"use client";

import { useEffect, useState } from "react";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@repo/web/components/ui/avatar.js";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@repo/web/components/ui/dropdown-menu.js";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@repo/web/components/ui/sidebar.js";
import { useProfile } from "@repo/web/hooks/useProfile.js";
import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
} from "lucide-react";

import { AvatarComponent } from "@/components/AvatarComponent.js";

import { ModeToggle } from "./mode-toggle.js";
import { useTheme } from "./theme-provider.js";

export function NavUser() {
	const { isMobile } = useSidebar();
	const { profile } = useProfile();
	const { theme, setTheme } = useTheme();
	const { handleSignOut } = useProfile();
	const [darkTheme, setDarkTheme] = useState(theme);

	useEffect(() => {
		//TODO - изменить позже тему
		// setTheme(darkTheme);
		setTheme("light");
	}, [darkTheme]);

	// const toggleTheme = () => {
	// 	darkTheme === "dark" ? setDarkTheme("light") : setDarkTheme("dark");
	// };

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarComponent />
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								{/* <span className="truncate font-semibold">{user.name}</span> */}
								<span className="truncate text-xs">{profile?.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarComponent />
									<AvatarFallback className="rounded-lg">CN</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{profile?.email}
									</span>
									{/* <span className="truncate text-xs">{profile.email}</span> */}
								</div>
							</div>
						</DropdownMenuLabel>
						{/* <DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Sparkles />
								Upgrade to Pro
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<BadgeCheck />
								Account
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CreditCard />
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Bell />
								Notifications
							</DropdownMenuItem>
							<DropdownMenuItem onClick={toggleTheme}>
								<ModeToggle darkTheme={darkTheme} />
								<span>Theme</span>
							</DropdownMenuItem>
						</DropdownMenuGroup> */}
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => handleSignOut()}>
							<LogOut />
							<span>Выйти</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
