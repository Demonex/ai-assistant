export type SignInMethod = "socials" | "email";

export interface ISignInFormInputs {
	emailLogin: string;
	password: string;
	rememberMe: boolean;
}

export interface RememberMeData {
	emailLogin?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}
