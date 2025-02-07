import { Fragment, useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AvatarComponent } from "./AvatarComponent.js";
import { DropdownMenuButton } from "./DropdownMenuButton.js";
import { formatLocalTime } from "helpers/index.js";
import { useChats } from "../hooks/useChats.js";
import { Spinner } from "./Spinner.js";
import { messageMockData } from "@/DataBase.js";

export const DialogWindow = () => {
	//////////тоже сменить let на const, когда все будет работать хорошо
	const {
		messages,
		setMessages,
		activeChat,
		setActiveChat,
		sendMessage,
		loading,
	} = useChats();
	const [message, setMessage] = useState("");
	const { register, handleSubmit, reset } = useForm();
	const id = useId();
	const messagesEndRef = useRef(null);
	const fileInputRef = useRef(null);

	const onSubmit = () => {
		setMessages([
			...messages,
			{
				id: id,
				created_at: new Date().toString(),
				message: { raw: message },
			},
		]);

		sendMessage({ message });
		setMessage("");
		reset();
	};

	const handleInputChange = (event) => {
		const value = event.target.value;
		setMessage(value);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			onSubmit();
		}
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
	};

	const onReturnToMenu = () => {
		setActiveChat(false);
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	////////////////////////////////////////////////////////DragAndDrop///////////////////////////////////

	const [files, setFiles] = useState([]);
	const [isOverlay, setIsOverlay] = useState(false);

	const handleDragEnter = (e) => {
		e.preventDefault();
		setIsOverlay(true);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		setIsOverlay(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setIsOverlay(false);

		const data = e.dataTransfer?.files || e.target.files;

		if (data.length) {
			setFiles(data);
		}

		console.log(data);
	};

	const handlePinFileButton = () => {
		fileInputRef.current?.click();
	};

	const handleCloseDocument = () => {
		setFiles([]);
		fileInputRef.current.value = "";
	};

	////////////////////////////////////////////////////////DragAndDrop///////////////////////////////////

	return (
		<div className="flex-grow">
			<div className="fixed inset-0 flex flex-col bg-background p-4 lg:relative lg:bg-transparent lg:p-0">
				<div className="flex justify-between gap-4">
					<div className="flex gap-4">
						<button
							onClick={onReturnToMenu}
							className="items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md flex h-10 w-10 p-0 lg:hidden"
						>
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
								className="lucide lucide-arrow-left h-4 w-4"
							>
								<path d="m12 19-7-7 7-7" />
								<path d="M19 12H5" />
							</svg>
						</button>
						<span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 border">
							<div className="w-3 h-3 absolute rounded-full end-0 bottom-0 bg-green-400" />
							<AvatarComponent />
						</span>
						<div className="flex flex-col">
							<span className="font-semibold">{activeChat?.title}</span>
						</div>
					</div>
					<DropdownMenuButton />
				</div>

				{/*--------------------------------------------------DragAndDrop------------------------------------------------------------*/}
				<div
					dir="ltr"
					className="overflow-hidden relative h-screen w-full py-4 lg:h-[calc(100vh_-_13.8rem)]"
					onDragEnter={handleDragEnter}
				>
					{isOverlay && (
						<div
							onDragOver={handleDragOver}
							onDrop={handleDrop}
							onDragLeave={handleDragLeave}
							className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center text-white"
						>
							Перенесите файл сюда (DOC, DOCX, PDF, TXT)
						</div>
					)}
					{/*------------------------------------------------DragAndDrop--------------------------------------------------------------*/}

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
							<div>
								<div className="flex flex-col items-start space-y-10 py-8">
									{messages?.map((message) => (
										<Fragment key={message.id}>
											{message.message && (
												<div className="max-w-screen-sm self-end">
													<div className="flex items-center gap-2">
														<div className="shadow-base rounded-lg border bg-card text-card-foreground order-1">
															<div className="inline-flex p-4">
																{message.message.raw}
															</div>
														</div>
													</div>
													<div className="flex items-center gap-2 justify-end">
														<time className="mt-1 flex items-center text-sm text-muted-foreground justify-end">
															{formatLocalTime(message.created_at)}
														</time>
													</div>
												</div>
											)}
											{message.response && (
												<div className="max-w-screen-sm">
													<div className="flex items-center gap-2">
														<div className="shadow-base rounded-lg border bg-card text-card-foreground">
															<div className="inline-flex p-4">
																{message.response.raw}
															</div>
														</div>
													</div>
													<div className="flex items-center gap-2">
														<time className="mt-1 flex items-center text-sm text-muted-foreground">
															{formatLocalTime(message.created_at)}
														</time>
													</div>
												</div>
											)}
											<div ref={messagesEndRef} />
										</Fragment>
									))}

									<>
										{/* <div className="max-w-screen-sm">
                      <div className="flex items-center gap-2">
                        <div className="shadow-base rounded-lg border bg-card text-card-foreground">
                          <div className="inline-flex p-4">
                            {message[0].message.raw}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <time className="mt-1 flex items-center text-sm text-muted-foreground">
                          05:23 PM
                        </time>
                      </div>
                    </div> */}
										{/* <div className="max-w-screen-sm">
                      <div className="flex items-center gap-2">
                        <div className="shadow-base rounded-lg border bg-card text-card-foreground">
                          <div className="inline-flex items-center p-4">
                            <svg
                              className="lucide lucide-file me-4 h-8 w-8 opacity-50"
                              fill="none"
                              height="24"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                            </svg>
                            <div className="flex flex-col gap-2">
                              <div>
                                resume.pdf
                                <span className="ms-2 text-sm text-muted-foreground">
                                  (10KB)
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                  Download
                                </button>
                                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                  Preview
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <time className="mt-1 flex items-center text-sm text-muted-foreground">
                          05:23 PM
                        </time>
                      </div>
                    </div>
                    <div className="max-w-screen-sm self-end">
                      <div className="flex items-center gap-2">
                        <div className="shadow-base rounded-lg border bg-card text-card-foreground order-1">
                          <div className="inline-flex p-4">
                            I know how important this file is to you. You can
                            trust me ;)
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <time className="mt-1 flex items-center text-sm text-muted-foreground justify-end">
                          05:23 PM
                        </time>
                        <svg
                          className="lucide lucide-check-check h-4 w-4 flex-shrink-0 text-green-500"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18 6 7 17l-5-5" />
                          <path d="m22 10-7.5 7.5L13 16" />
                        </svg>
                      </div>
                    </div>
                    <div className="max-w-screen-sm">
                      <div className="flex items-center gap-2">
                        <div className="shadow-base rounded-lg border bg-card text-card-foreground">
                          <div className="inline-flex p-4">
                            I know how important this file is to you. You can
                            trust me ;) I know how important this file is to
                            you. You can trust me ;) know how important this
                            file is to you. You can trust me ;)
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <time className="mt-1 flex items-center text-sm text-muted-foreground">
                          05:23 PM
                        </time>
                      </div>
                    </div>
                    <div className="max-w-screen-sm">
                      <div className="flex items-center gap-2">
                        <div className="shadow-base rounded-lg border bg-card text-card-foreground">
                          <div className="inline-flex p-4">
                            I know how important this file is to you. You can
                            trust me ;) I know how important this file is to
                            you. You can trust me ;) know how important this
                            file is to you. You can trust me ;)
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <time className="mt-1 flex items-center text-sm text-muted-foreground">
                          05:23 PM
                        </time>
                      </div>
                    </div>
                    <div className="max-w-screen-sm self-end">
                      <div className="flex items-center gap-2">
                        <div className="shadow-base rounded-lg border bg-card text-card-foreground order-1">
                          <div className="inline-flex p-4">
                            I know how important this file is to you. You can
                            trust me ;) I know how important this file is to
                            you. You can trust me ;) know how important this
                            file is to you. You can trust me ;)
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <time className="mt-1 flex items-center text-sm text-muted-foreground justify-end">
                          05:23 PM
                        </time>
                        <svg
                          className="lucide lucide-check-check h-4 w-4 flex-shrink-0 text-green-500"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18 6 7 17l-5-5" />
                          <path d="m22 10-7.5 7.5L13 16" />
                        </svg>
                      </div>
                    </div>
                    <div className="max-w-screen-sm">
                      <div className="flex items-center gap-2">
                        <div className="shadow-base rounded-lg border bg-card text-card-foreground">
                          <div className="inline-flex p-4">
                            I know how important this file is to you. You can
                            trust me ;) I know how important this file is to
                            you. You can trust me ;) know how important this
                            file is to you. You can trust me ;)
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <time className="mt-1 flex items-center text-sm text-muted-foreground">
                          05:23 PM
                        </time>
                      </div>
                    </div>
                    <div className="max-w-screen-sm">
                      <div className="flex items-center gap-4">
                        <div
                          className="relative order-1 flex aspect-[4/3] w-52 flex-shrink-0 cursor-pointer items-center justify-center self-start rounded-lg bg-cover transition-opacity hover:opacity-90"
                          style={{
                            backgroundImage:
                              'url("https://dashboard.shadcnuikit.com//images/chats/image5.jpg")',
                          }}
                        >
                          <svg
                            className="lucide lucide-play h-8 w-8 text-white/80"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polygon points="6 3 20 12 6 21 6 3" />
                          </svg>
                          <div className="absolute end-2 top-2 text-xs font-semibold text-white/60">
                            2:42
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <time className="mt-1 flex items-center text-sm text-muted-foreground">
                          05:23 PM
                        </time>
                      </div>
                    </div>
                    <div className="max-w-screen-sm self-end">
                      <div className="flex items-center gap-2">
                        <div className="shadow-base rounded-lg border bg-card text-card-foreground order-1">
                          <div className="inline-flex items-center p-4">
                            <svg
                              className="lucide lucide-file me-4 h-8 w-8 opacity-50"
                              fill="none"
                              height="24"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                            </svg>
                            <div className="flex flex-col gap-2">
                              <div>
                                important_documents.pdf
                                <span className="ms-2 text-sm text-muted-foreground">
                                  (50KB)
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                  Download
                                </button>
                                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                  Preview
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <time className="mt-1 flex items-center text-sm text-muted-foreground justify-end">
                          05:23 PM
                        </time>
                        <svg
                          className="lucide lucide-check-check h-4 w-4 flex-shrink-0 text-green-500"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18 6 7 17l-5-5" />
                          <path d="m22 10-7.5 7.5L13 16" />
                        </svg>
                      </div>
                    </div>
                    <div className="max-w-screen-sm self-end">
                      <div className="flex items-center gap-2">
                        <div className="shadow-base rounded-lg border bg-card text-card-foreground relative order-1 flex items-center justify-center">
                          <div className="inline-flex gap-4 p-4">
                            <audio className="block w-80" controls id="song">
                              <source src="/sound.mp3" type="audio/mpeg" />
                            </audio>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <time className="mt-1 flex items-center text-sm text-muted-foreground justify-end">
                          05:23 PM
                        </time>
                        <svg
                          className="lucide lucide-check-check h-4 w-4 flex-shrink-0 text-green-500"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18 6 7 17l-5-5" />
                          <path d="m22 10-7.5 7.5L13 16" />
                        </svg>
                      </div>
                    </div>
                    <div className="max-w-screen-sm self-end">
                      <div className="flex items-center gap-4">
                        <div
                          className="relative order-1 flex aspect-[4/3] w-52 flex-shrink-0 cursor-pointer items-center justify-center self-start rounded-lg bg-cover transition-opacity hover:opacity-90"
                          style={{
                            backgroundImage:
                              'url("https://dashboard.shadcnuikit.com//images/chats/image4.jpg")',
                          }}
                        >
                          <svg
                            className="lucide lucide-play h-8 w-8 text-white/80"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polygon points="6 3 20 12 6 21 6 3" />
                          </svg>
                          <div className="absolute end-2 top-2 text-xs font-semibold text-white/60">
                            5:42
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <time className="mt-1 flex items-center text-sm text-muted-foreground justify-end">
                          05:23 PM
                        </time>
                        <svg
                          className="lucide lucide-check-check h-4 w-4 flex-shrink-0 text-green-500"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18 6 7 17l-5-5" />
                          <path d="m22 10-7.5 7.5L13 16" />
                        </svg>
                      </div>
                    </div>
                    <div className="max-w-screen-sm self-end">
                      <div className="flex items-center gap-2">
                        <div className="shadow-base rounded-lg border bg-card text-card-foreground relative order-1 flex items-center justify-center">
                          <div className="inline-flex gap-4 p-4">
                            <div className="grid gap-2 grid-cols-2">
                              <figure className="relative cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-90">
                                <img
                                  alt="alt"
                                  className="aspect-[4/3] object-cover"
                                  src="https://dashboard.shadcnuikit.com//images/chats/image1.jpg"
                                />
                              </figure>
                              <figure className="relative cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-90">
                                <img
                                  alt="alt"
                                  className="aspect-[4/3] object-cover"
                                  src="https://dashboard.shadcnuikit.com//images/chats/image2.jpg"
                                />
                              </figure>
                              <figure className="relative cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-90">
                                <img
                                  alt="alt"
                                  className="aspect-[4/3] object-cover"
                                  src="https://dashboard.shadcnuikit.com//images/chats/image3.jpg"
                                />
                              </figure>
                              <figure className="relative cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-90">
                                <img
                                  alt="alt"
                                  className="aspect-[4/3] object-cover"
                                  src="https://dashboard.shadcnuikit.com//images/chats/image4.jpg"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-3xl font-semibold text-white">
                                  +1
                                </div>
                              </figure>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <time className="mt-1 flex items-center text-sm text-muted-foreground justify-end">
                          05:23 PM
                        </time>
                        <svg
                          className="lucide lucide-check-check h-4 w-4 flex-shrink-0 text-green-500"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18 6 7 17l-5-5" />
                          <path d="m22 10-7.5 7.5L13 16" />
                        </svg>
                      </div>
                    </div> */}
									</>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					style={
						files.length
							? {
									borderTop: 0,
									borderTopLeftRadius: 0,
									borderTopRightRadius: 0,
								}
							: {}
					}
					className="relative shadow-base rounded-lg border bg-card text-card-foreground"
				>
					{files.length > 0 && (
						<div className="absolute -left-px -right-px bottom-full border border-b-0 rounded-l-lg rounded-r-lg flex flex-wrap gap-2 p-2 lg:p-4 lg:pb-1">
							<div
								aria-label="document-1738765831781.pdf"
								className="relative flex w-40 rounded-md border border-slate-100 text-xs shadow shadow-slate-200"
								title="document-1738765831781.pdf"
							>
								<div
									aria-hidden="true"
									className="grid h-12 w-12 flex-shrink-0 place-items-center truncate rounded-bl-md rounded-tl-md bg-[hsl(224.52deg_75%_48.63%)] font-medium uppercase text-white"
								>
									{files[0].name.split(".").pop()}
								</div>
								<div className="min-w-0 px-3 py-2">
									<p className="truncate" title="document-1738765831781.pdf">
										{files[0].name}
									</p>
									<div className="text-gray-500">
										{Math.floor(files[0].size / 1024)} KB
									</div>
									<div
										onClick={handleCloseDocument}
										className="absolute right-0 top-0 z-10 -translate-y-2 translate-x-2 cursor-pointer rounded-full bg-white p-1 shadow shadow-slate-200 hover:bg-stone-100"
									>
										<span>
											<svg
												aria-hidden="true"
												className="h-2 w-2 fill-stone-500"
												preserveAspectRatio="none"
												viewBox="0 0 1024 1024"
											>
												<path
													clipRule="evenodd"
													d="M587.19 506.246l397.116-397.263a52.029 52.029 0 0 0 0-73.143l-2.194-2.194a51.98 51.98 0 0 0-73.143 0l-397.068 397.8-397.068-397.8a51.98 51.98 0 0 0-73.143 0l-2.146 2.194a51.054 51.054 0 0 0 0 73.143l397.069 397.263L39.544 903.461a52.029 52.029 0 0 0 0 73.142l2.146 2.195a51.98 51.98 0 0 0 73.143 0L511.9 581.583l397.068 397.215a51.98 51.98 0 0 0 73.143 0l2.194-2.146a52.029 52.029 0 0 0 0-73.143L587.19 506.246z"
													fillRule="evenodd"
												/>
											</svg>
										</span>
									</div>
								</div>
							</div>
						</div>
					)}
					<div>
						<form
							className="w-full relative flex items-center p-2 lg:p-4"
							onSubmit={handleSubmit(onSubmit)}
						>
							<input
								{...register("message", {
									required: "Message is required",
								})}
								placeholder="Enter message..."
								onChange={handleInputChange}
								onKeyDown={handleKeyDown}
								className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-transparent pe-32 !text-base !shadow-transsparent !ring-transparent lg:pe-56"
							/>
							<div className="end-4 flex items-center">
								<div className="relative ml-3">
									<input
										type="file"
										ref={fileInputRef}
										onChange={handleDrop}
										style={{ display: "none" }}
									/>
									<button
										type="button"
										className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-11 w-11 rounded-full p-0"
										data-state="closed"
										onClick={handlePinFileButton}
									>
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
											className="lucide lucide-paperclip h-4 w-4"
										>
											<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
										</svg>
									</button>
								</div>
								{!loading && (
									<button
										disabled={!message && !files.length}
										type="submit"
										className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ms-3"
									>
										Send
									</button>
								)}
								{loading && <Spinner />}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
