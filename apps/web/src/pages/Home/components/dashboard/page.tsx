import { useState } from "react";
import { admin } from "@/shared/config/index.js";
import { AppSidebar } from "@/components/app-sidebar.js";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.js";
import { Separator } from "@/components/ui/separator.js";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar.js";
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
			<AppSidebar handleAdmin={(value) => setIsAdmin(value)} />

			{isAdmin ? (
				<section className="sticky top-0 bottom-0 w-full">
					<iframe
						title="admin"
						src={`${import.meta.env.VITE_ADMIN_URL}/admin`}
						width="100%"
						height="100%"
						allowFullScreen
					></iframe>
				</section>
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
