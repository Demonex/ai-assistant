import type { FieldError, UseFormRegister } from "react-hook-form";
import { FormInputError } from "@/shared/ui/FormUi/FormInputError.js";
import type { IUpdateProfileFormInputs } from "../types/types.js";

interface LoginInputProps {
	register: UseFormRegister<IUpdateProfileFormInputs>;
	error: FieldError | undefined;
	defaultValue: string | undefined;
}

export const LoginInput = (props: LoginInputProps) => {
	const { register, error, defaultValue } = props;

	return (
		<div>
			<label htmlFor="name" className="text-caption_m_desk text-medium_grey">
				Логин
			</label>
			<div className="mt-1.5">
				<input
					id="name"
					type="text"
					className="w-full rounded-xl border border-solid border-medium_grey py-2.5 px-3.5 bg-[transparent] text-white  text-caption_r_desk"
					defaultValue={defaultValue}
					{...register("name", { maxLength: 256 })}
				/>
			</div>
			{error && <FormInputError message={error.message} />}
		</div>
	);
};
