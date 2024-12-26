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
import { TrashComponent } from "../TrashComponent.js";

export function DashboardPage() {
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
				<header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Inbox</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				<TrashComponent />
			</SidebarInset>
		</SidebarProvider>
	);
}
