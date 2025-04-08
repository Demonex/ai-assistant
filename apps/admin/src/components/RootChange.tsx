"use client";

import { ReactNode } from "react";

// import { WebMonoHooksStore } from "@repo/web/components/App.js";
import { AppSidebar } from "@repo/web/components/app-sidebar.js";
import { Breadcrumb } from "@repo/web/components/ui/breadcrumb.js";
import { Separator } from "@repo/web/components/ui/separator.js";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@repo/web/components/ui/sidebar.js";

type WebWrapperProps = {
	children: ReactNode;
};

export const WebWrapper = ({ children }: WebWrapperProps) => {
	return (
		<>
			<SidebarProvider
				style={
					{
						"--sidebar-width": "40px",
						"max-height": "100%",
					} as React.CSSProperties
				}
			>
				<AppSidebar isAdminPage={true} />

				<SidebarInset>
					<div className="tailwind-container">
						<header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-[#fbfbfb] p-4">
							<SidebarTrigger className="-ml-1" />
							<Separator orientation="vertical" className="mr-2 h-4" />
							<Breadcrumb></Breadcrumb>
						</header>
					</div>

					<div className="test-ui">{children}</div>
				</SidebarInset>
			</SidebarProvider>
			{/* <WebMonoHooksStore /> */}
		</>
	);
};
