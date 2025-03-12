import { Button } from "@/components/ui/button.js";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.js";
import { Input } from "@/components/ui/input.js";
import { Label } from "@/components/ui/label.js";
import { SelectComponent } from "./SelectComponent.js";
import { FormFineTuning } from "./FormFineTuning.js";

export function FormNewCollection() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<path d="M8 12h8"></path>
						<path d="M12 8v8"></path>
					</svg>
					<span>Добавить</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Добавить новую коллекцию документов</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Имя
						</Label>
						<Input id="name" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="description" className="text-right">
							Описание
						</Label>
						<Input id="description" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="LLM-model" className="text-right">
							LLM-модель
						</Label>
						<SelectComponent placeholder={"Выберите LLM-модель"} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="Embending-model" className="text-right">
							Embending-модель
						</Label>
						<SelectComponent placeholder={"Выберите Embending-модель"} />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<FormFineTuning />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Сохраить</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
