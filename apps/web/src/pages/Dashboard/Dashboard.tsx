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
	// const { dataWiki } = useWiki({
	// 	apiKey:
	// 		"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzaWdtYUBzaWdtYS1pdC5ydSIsIm5hbWUiOiJBZG1pbmlzdHJhdG9yIiwiYXYiOm51bGwsInR6IjoiQW1lcmljYS9OZXdfWW9yayIsImxjIjoiZW4iLCJkZiI6IiIsImFwIjoiIiwicGVybWlzc2lvbnMiOlsibWFuYWdlOnN5c3RlbSJdLCJncm91cHMiOlsxXSwiaWF0IjoxNzQ0MzcxMDg5LCJleHAiOjE3NDQzNzI4ODksImF1ZCI6InVybjp3aWtpLmpzIiwiaXNzIjoidXJuOndpa2kuanMifQ.Fa6EdLHLs0s3KzF-eTGtOI_adIis-8zg-ag3AfL5iy5wuGuh-8WfUg-xhN0GjDzKDcwFt6MINEWw1oiWoQAeqUuxIFkuYHsHItxrZSSikOG_JAG3x9sMtNrRaakiEgpub2ug3tdTHhPPFb4jKYpZn-Lmbmj3em6L-_Yy6mSen3a31UHtWQS4w91e_u5dMvTGe0ZwzJjVO9w0qiC49icZVHUVms2obF3JMf2Hm589RLI1l4ke5LOJ1WXnaaylHp6CPGArG7qNrPE1PIGmroUynYEivdc3k4rgonnIrrUeeqDldMyO82aGJ-Y3rbILUIAQNaz0rFRKCqUiaAgpIG5m1g",
	// 	baseUrl: "http://localhost:3000",
	// 	collectionId: 1,
	// });

	// console.log(dataWiki);

	useEffect(() => {
		if (errorProfile && errorProfile.statusCode !== 401) {
			toast({
				variant: "destructive",
				title: errorProfile.statusCode.toString(),
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
