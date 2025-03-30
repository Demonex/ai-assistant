"use client";

import { ReactNode } from "react";

import { WebMonoHooksStore } from "@repo/web/components/App.js";
import { AppSidebar } from "@repo/web/components/app-sidebar.js";
import {
	SidebarInset,
	SidebarProvider,
} from "@repo/web/components/ui/sidebar.js";

interface WebWrapperProps {
	children: ReactNode;
}

export const WebWrapper = ({ children }: WebWrapperProps) => {
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
