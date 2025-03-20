import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@repo/web/components/ui/avatar.js";

export function AvatarComponent() {
	return (
		<Avatar>
			<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	);
}
