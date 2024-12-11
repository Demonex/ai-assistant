import type { UseFormReset } from "react-hook-form";
import type { ISignInFormInputs } from "../../types/types.js";

interface FormActionsProps {
	reset: UseFormReset<ISignInFormInputs>;
}

export const FormActions = (props: FormActionsProps) => {
	const { reset } = props;

	return (
		<div className="flex flex-col md:flex-row gap-3 md:gap-3.5 mt-2">
			<button
				type="button"
				className="flex w-full justify-center rounded-xl border border-solid border-medium_grey px-3 py-3.5 text-caption_m_desk text-white hover:scale-105 transition duration-300"
				onClick={() => reset()}
			>
				Отмена
			</button>
			<button
				type="submit"
				className="flex w-full justify-center rounded-xl bg-primary_blue px-3 py-3.5 text-caption_m_desk text-white hover:scale-105 transition duration-300"
			>
				Войти
			</button>
		</div>
	);
};
