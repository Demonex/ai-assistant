import type { UseFormRegister } from "react-hook-form";
import type { ISignInFormInputs } from "../../types/types.js";

interface RememberMeInputProps {
	register: UseFormRegister<ISignInFormInputs>;
}

export const RememberMeInput = (props: RememberMeInputProps) => {
	const { register } = props;

	return (
		<div className="flex items-center">
			<input
				id="remember-me"
				name="remember-me"
				type="checkbox"
				defaultChecked={true}
				className="h-6 w-6 rounded border-dark_grey bg-popup_gray "
				{...register("rememberMe")}
			/>
			<label
				htmlFor="remember-me"
				className="ml-2 text-caption_r_desk text-medium_grey"
			>
				Запомнить меня
			</label>
		</div>
	);
};
