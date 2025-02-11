import { Button } from "@/components/ui/button.js";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.js";
import { Label } from "@/components/ui/label.js";
import { SliderComponent } from "./SliderComponent.js";
import { Textarea } from "@/components/ui/textarea.js";
import { Badge } from "@/components/ui/badge.js";
import { RadioGroupComponent } from "./RadioGroupComponent.js";

export function FormFineTuning() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="col-span-4">
					Тонкая настройка
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Тонкая настройка</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Количество документов
						</Label>
					</div>
					<div className="items-center gap-4">
						<RadioGroupComponent />
					</div>
					<div className="items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Минимальная релевантность документов, доли
						</Label>
					</div>
					<div className="items-center gap-4">
						<SliderComponent />
						{/* <Badge>2048reggeeg</Badge> */}
					</div>
					<div className="items-center gap-4">
						<Label htmlFor="description" className="text-right">
							Максимальная длина ответа, токены
						</Label>
					</div>
					<div className="items-center gap-4">
						<SliderComponent />
					</div>
					<div className="gitems-center gap-4">
						<Label htmlFor="description" className="text-right">
							Шаблоны запроса
						</Label>
					</div>
					<div className="items-center gap-4">
						<Textarea
							style={{ maxHeight: "100px" }}
							placeholder="Ответь на вопрос при условии контекста"
						/>
					</div>
					<div className="items-center gap-4">
						<Label htmlFor="description" className="text-right">
							Креативность (температура)
						</Label>
					</div>
					<div className="items-center gap-4">
						<SliderComponent />
					</div>
					<div className="items-center gap-4">
						<Label htmlFor="description" className="text-right">
							Наказание за повторы
						</Label>
					</div>
					<div className="items-center gap-4">
						<SliderComponent />
					</div>
					<div className="items-center gap-4">
						<Label htmlFor="description" className="text-right">
							top-P сэмлирование
						</Label>
					</div>
					<div className="items-center gap-4">
						<SliderComponent />
					</div>
					<div className="items-center gap-4">
						<Label htmlFor="description" className="text-right">
							top-K сэмлирование
						</Label>
					</div>
					<div className="items-center gap-4">
						<SliderComponent />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Сохранить</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
