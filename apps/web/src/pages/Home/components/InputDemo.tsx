import { Input } from "@/components/ui/input.js";

export function InputDemo() {
	return (
		<div className="relative flex items-center px-6 py-3">
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
				className="lucide lucide-search absolute start-10 h-4 w-4 text-muted-foreground"
			>
				<circle cx={11} cy={11} r={8} />
				<path d="m21 21-4.3-4.3" />
			</svg>
			<input
				type="text"
				className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ps-10"
				placeholder="Chats search..."
			/>
			{/* <Input type="email" placeholder="Email" /> */}
		</div>
	);
}
