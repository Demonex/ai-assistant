import { DropdownMenuDemo } from "./DropdownMenuDemo.js";
import { AvatarDemo } from "./AvatarDemo.js";
import { Input } from "@/components/ui/input.js";
import { DropdownMenuCircle } from "./DropdownMenuCircle.js";
import ScrollAreaDemo from "./ScrollArea.js";
import { DialogWindow } from "./DialogWindow.js";
import { useState } from "react";

export const TrashComponent = () => {
	const [openDialog, setOpenDialog] = useState(true);
	const onReturnToMenu = () => {
		setOpenDialog(false);
	};

	const onOpenDialogWindow = () => {
		setOpenDialog(true);
	};
	return (
		<main className="p-4">
			<div className="gap-8 lg:flex">
				<div className="w-full lg:w-96">
					<div className="shadow-base rounded-lg border bg-card text-card-foreground">
						<div className="flex flex-col space-y-1.5 p-6 py-4 lg:py-6">
							<div className="flex items-center justify-between">
								<h3 className="text-lg leading-none tracking-tight font-bold">
									Chats
								</h3>
								<DropdownMenuDemo />
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
												<div className="group relative flex min-w-0 cursor-pointer items-center gap-4 px-6 py-4 hover:bg-muted">
													<span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 border">
														<AvatarDemo />
														<div className="w-3 h-3 absolute rounded-full end-0 bottom-0 bg-green-400" />
													</span>
													<div className="min-w-0 flex-grow">
														<div className="flex justify-between">
															<span className="font-semibold">
																Jacquenetta Slowgrave
															</span>
															<span className="text-sm text-muted-foreground">
																10 minutes
															</span>
														</div>
														<div className="flex items-center gap-2">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={24}
																height={24}
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																strokeWidth={2}
																strokeLinecap="round"
																strokeLinejoin="round"
																className="lucide lucide-check h-4 w-4 flex-shrink-0 text-muted-foreground"
															>
																<path d="M20 6 9 17l-5-5" />
															</svg>
															<span className="truncate text-start text-muted-foreground">
																Great! Looking forward to it. See you later!
															</span>
															<div className="ms-auto flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm text-white">
																8
															</div>
														</div>
													</div>
													<div className="absolute bottom-0 end-0 top-0 flex items-center bg-gradient-to-l from-50% px-4 opacity-0 group-hover:opacity-100 from-muted">
														<DropdownMenuCircle />
													</div>
												</div>
												<div className="group relative flex min-w-0 cursor-pointer items-center gap-4 px-6 py-4 hover:bg-muted">
													<span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 border">
														<div className="w-3 h-3 absolute rounded-full end-0 bottom-0 bg-green-400" />
														<span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
															<AvatarDemo />
														</span>
													</span>
													<div className="min-w-0 flex-grow">
														<div className="flex justify-between">
															<span className="font-semibold">
																Ealasaid Bohlje
															</span>
															<span className="text-sm text-muted-foreground">
																10 days
															</span>
														</div>
														<div className="flex items-center gap-2">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={24}
																height={24}
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																strokeWidth={2}
																strokeLinecap="round"
																strokeLinejoin="round"
																className="lucide lucide-check-check h-4 w-4 flex-shrink-0 text-green-500"
															>
																<path d="M18 6 7 17l-5-5" />
																<path d="m22 10-7.5 7.5L13 16" />
															</svg>
															<span className="truncate text-start text-muted-foreground">
																I might be 10 minutes late. Sorry!
															</span>
														</div>
													</div>
													<div className="absolute bottom-0 end-0 top-0 flex items-center bg-gradient-to-l from-50% px-4 opacity-0 group-hover:opacity-100 from-muted">
														<DropdownMenuCircle />
													</div>
												</div>
												<ScrollAreaDemo
													onOpenDialogWindow={onOpenDialogWindow}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{openDialog && <DialogWindow onReturnToMenu={onReturnToMenu} />}
			</div>
		</main>
	);
};
