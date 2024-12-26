import { Button } from "@/components/ui/button.js";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.js";

export function DropdownMenuDemo() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">New</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						New chat
						<DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Create Group
						<DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						New Update
						<DropdownMenuShortcut>⌘U</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Add contact
						<DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
