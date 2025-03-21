import { Label } from "@repo/web/components/ui/label.js";
import {
	RadioGroup,
	RadioGroupItem,
} from "@repo/web/components/ui/radio-group.js";

export function RadioGroupComponent() {
	return (
		<RadioGroup
			defaultValue="comfortable"
			className="grid grid-cols-6 items-center gap-4"
		>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="default" id="r1" />
				<Label htmlFor="r1">1</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="2" id="r2" />
				<Label htmlFor="r2">2</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="3" id="r3" />
				<Label htmlFor="r3">3</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="4" id="r4" />
				<Label htmlFor="r4">4</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="5" id="r5" />
				<Label htmlFor="r5">5</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="10" id="r10" />
				<Label htmlFor="r10">10</Label>
			</div>
		</RadioGroup>
	);
}
