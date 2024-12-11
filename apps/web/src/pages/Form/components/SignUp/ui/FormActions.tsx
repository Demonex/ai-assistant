import type { UseFormReset } from "react-hook-form";
import type { ISignUpFormInputs } from "../types/types.js";
import { Button } from "@/shared/ui/Button/Button.js";

interface FormActionsProps {
	reset: UseFormReset<ISignUpFormInputs>;
}

export const FormActions = (props: FormActionsProps) => {
	const { reset } = props;

	return (
		<div className="flex flex-col md:flex-row gap-3 md:gap-3.5 mt-2">
			<Button type="button" variant="secondary" onClick={() => reset()}>
				Отмена
			</Button>
			<Button>Создать</Button>
		</div>
	);
};
