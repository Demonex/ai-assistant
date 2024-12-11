import type { FieldError, UseFormRegister } from "react-hook-form";
import type { ISignUpFormInputs } from "../types/types.js";
import { FormInputError } from "@/shared/ui/FormUi/FormInputError.js";

interface LoginInputProps {
	register: UseFormRegister<ISignUpFormInputs>;
	error: FieldError | undefined;
}

export const LoginInput = (props: LoginInputProps) => {
	const { register, error } = props;

	return (
		<div>
			<label htmlFor="name" className="text-caption_m_desk text-medium_grey">
				Логин <span className="text-secondary_red">*</span>
			</label>
			<div className="mt-1.5">
				<input
					id="name"
					type="text"
					className="block w-full border-solid rounded-xl border border-dark_grey p-[.875rem] text-white !bg-[transparent] text-t2Regular md:text-caption_r_desk placeholder:text-medium_grey focus:ring-0 focus:border-medium_grey"
					{...register("name", { required: "Логин обязателен" })}
					placeholder="Придумай логин"
				/>
			</div>
			{error && <FormInputError message={error.message} />}
		</div>
	);
};
