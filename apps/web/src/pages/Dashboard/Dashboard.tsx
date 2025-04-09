import { useEffect } from "react";
import { Outlet } from "react-router";

import { AppSidebar } from "@repo/web/components/app-sidebar.js";
import { Breadcrumb } from "@repo/web/components/ui/breadcrumb.js";
import { Separator } from "@repo/web/components/ui/separator.js";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@repo/web/components/ui/sidebar.js";

import { toast } from "@/hooks/use-toast.js";
import { useProfile } from "@/hooks/useProfile.js";

const DashboardPage = () => {
	const { errorProfile } = useProfile();

	useEffect(() => {
		if (errorProfile && errorProfile.status !== 401) {
			toast({
				variant: "destructive",
				title: errorProfile.status.toString(),
				description: errorProfile.message,
			});
		}
	}, [errorProfile]);

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "50px",
				} as React.CSSProperties
			}
		>
			<AppSidebar />

			<SidebarInset>
				<header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-[#fbfbfb] p-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb></Breadcrumb>
				</header>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardPage;
