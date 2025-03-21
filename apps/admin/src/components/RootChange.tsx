"use client";
import {
	SidebarInset,
	SidebarProvider,
} from "@repo/web/components/ui/sidebar.js";
import { AppSidebar } from "@repo/web/components/app-sidebar.js";
import { WebMonoHooksStore } from "@repo/web/components/App.js";

export const WebWrapper = ({ children }: any) => {
	return (
		<>
			<SidebarProvider
				style={
					{
						"--sidebar-width": "50px",
					} as React.CSSProperties
				}
			>
				<div className="tailwind-container">
					<AppSidebar />
				</div>

				<SidebarInset>
					<div className="test-ui">{children}</div>
				</SidebarInset>
			</SidebarProvider>
			<WebMonoHooksStore />
		</>
	);
};
