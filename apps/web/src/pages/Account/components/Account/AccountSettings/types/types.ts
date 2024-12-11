import type { ISignUpFormInputs } from "@/pages/Form/components/SignUp/types/types.js";

export type IUpdateProfileFormInputs = Pick<
	ISignUpFormInputs,
	"name" | "email" | "password"
>;
