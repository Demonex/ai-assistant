import { Button } from "@/components/ui/button.js";
import { useToast } from "@/hooks/use-toast.js";
import { ToastAction } from "@radix-ui/react-toast";

export function ToastComponent() {
	const { toast } = useToast();

	return (
		<Button
			variant="outline"
			onClick={() => {
				toast({
					description: "Your message has been sent.",
				});
			}}
		>
			Show Toast
		</Button>
	);
}
