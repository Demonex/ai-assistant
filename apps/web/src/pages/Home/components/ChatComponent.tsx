import { AvatarDemo } from "./AvatarDemo.js";
import { Input } from "@/components/ui/input.js";
import { DropdownMenuButton } from "./DropdownMenuButton.js";
import ScrollAreaDemo from "./ScrollArea.js";
import { DialogWindow } from "./DialogWindow.js";
import { memo, useState } from "react";

const Sidebar = memo(() => {
	return (
		<div className="w-full lg:w-96">
			<div className="shadow-base rounded-lg border bg-card text-card-foreground">
				<div className="flex flex-col space-y-1.5 p-6 py-4 lg:py-6">
					<div className="flex items-center justify-between">
						<h3 className="text-lg leading-none tracking-tight font-bold">
							Chats
						</h3>
					</div>
				</div>
				<div className="p-0">
					<div className="relative flex items-center px-6 py-3">
						<Input type="text" placeholder="Charts search..." />
					</div>
					<div className="flex h-[calc(100vh_-_13rem)] lg:h-[calc(100vh_-_15.8rem)] lg:pt-4">
						<div
							dir="ltr"
							className="relative overflow-hidden w-full min-w-0"
							style={{
								position: "relative",
							}}
						>
							<style
								dangerouslySetInnerHTML={{
									__html:
										"\n[data-radix-scroll-area-viewport] {\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  -webkit-overflow-scrolling: touch;\n}\n[data-radix-scroll-area-viewport]::-webkit-scrollbar {\n  display: none;\n}\n:where([data-radix-scroll-area-viewport]) {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n:where([data-radix-scroll-area-content]) {\n  flex-grow: 1;\n}\n",
								}}
							/>
							<div
								data-radix-scroll-area-viewport
								className="h-full w-full rounded-[inherit]"
								style={{ overflow: "hidden scroll" }}
							>
								<div data-radix-scroll-area-content>
									<div className="block min-w-0 divide-y">
										<ScrollAreaDemo onOpenDialogWindow={() => {}} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export const ChatComponent = memo(() => {
	return (
		<main className="p-4">
			<div className="gap-8 lg:flex">
				<Sidebar />
				<DialogWindow />
			</div>
		</main>
	);
});
