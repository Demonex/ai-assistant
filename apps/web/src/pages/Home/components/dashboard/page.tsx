import { useState } from "react";
import { admin } from "@repo/web/shared/config/index.js";
import { AppSidebar } from "@repo/web/components/app-sidebar.js";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@repo/web/components/ui/breadcrumb.js";
import { Separator } from "@repo/web/components/ui/separator.js";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@repo/web/components/ui/sidebar.js";
import { ChatComponent } from "../ChatComponent.js";

export function DashboardPage() {
	const [isAdmin, setIsAdmin] = useState(false);

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "50px",
				} as React.CSSProperties
			}
		>
			<AppSidebar />

			{isAdmin ? (
				<section className="sticky top-0 bottom-0 w-full"></section>
			) : (
				<SidebarInset>
					<header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							{/* <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inbox</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList> */}
						</Breadcrumb>
					</header>
					<ChatComponent />
				</SidebarInset>
			)}
		</SidebarProvider>
	);
}
