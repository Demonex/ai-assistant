import { memo, useState } from "react";
import { Input } from "@/components/ui/input.js";
import MessageList from "./MessageList.js";
import { useChats } from "../hooks/useChats.js";
import { FormNewCollection } from "./FormNewCollection.js";
import { collectionMockData } from "@/DataBase.js";

export const Sidebar = memo(() => {
	const { chats } = useChats();
	const [inputValue, setInputValue] = useState("");

	let filteredChats = chats;

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	if (inputValue) {
		filteredChats = chats.filter((item) =>
			item.title !== null
				? item.title.toLowerCase().includes(inputValue.toLowerCase())
				: null,
		);
	}

	//   filteredChats = collectionMockData;

	return (
		<div className="w-full lg:w-96">
			<div className="shadow-base h-full rounded-lg border bg-card text-card-foreground">
				<div className="flex flex-col space-y-1.5 p-6 py-4 lg:py-10">
					<div className="flex items-center justify-between">
						<h3 className="text-lg leading-none tracking-tight font-bold">
							Чаты
						</h3>
						{/* <FormNewCollection /> */}
					</div>
				</div>
				<div className="p-0">
					<div className="relative flex items-center px-6 py-3">
						<Input
							type="text"
							placeholder="Поиск по чатам..."
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex h-[calc(100vh_-_13rem)] lg:h-[calc(100vh_-_15.8rem)] lg:pt-4">
						<div dir="ltr" className="relative overflow-hidden w-full min-w-0">
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
										<MessageList chats={filteredChats} />
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
