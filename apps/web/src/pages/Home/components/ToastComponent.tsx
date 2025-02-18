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
					title: "Файл успешно отправлен!",
					description:
						"Обработка займет некоторое время, после чего информация из файла станет доступна.",
				});
			}}
		>
			Show Toast
		</Button>
	);
}
