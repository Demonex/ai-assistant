import { AppSidebar } from "@repo/web/components/app-sidebar.js";
import { Breadcrumb } from "@repo/web/components/ui/breadcrumb.js";
import { Separator } from "@repo/web/components/ui/separator.js";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@repo/web/components/ui/sidebar.js";

// import { admin } from "@repo/web/shared/config/index.js";

import { ChatComponent } from "../ChatComponent.js";

export function DashboardPage() {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "50px",
				} as React.CSSProperties
			}
		>
			<AppSidebar isAdminPage={true} />

			<SidebarInset>
				<header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-[#fbfbfb] p-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb></Breadcrumb>
				</header>
				<ChatComponent />
			</SidebarInset>
		</SidebarProvider>
	);
}
