import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

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

// import { useWiki } from "@/hooks/useWiki.js";

const DashboardPage = () => {
	const { pathname } = useLocation();
	const { errorProfile } = useProfile();
	// const { dataWiki } = useWiki();

	// console.log(dataWiki);

	useEffect(() => {
		if (errorProfile && errorProfile.statusCode !== 401) {
			toast({
				variant: "destructive",
				title: errorProfile?.statusCode?.toString(),
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
				{pathname === "/" && (
					<div className="text-2xl font-bold flex justify-center items-center w-full h-full">
						Добро пожаловать в SigmaChatDoc!
					</div>
				)}
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardPage;
