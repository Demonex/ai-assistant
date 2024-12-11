import { useEffect } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { ISignInFormInputs, RememberMeData } from "../types/types.js";

export const useRememberMe = (setValue: UseFormSetValue<ISignInFormInputs>) => {
	useEffect(() => {
		const savedPreferences = localStorage.getItem("rememberMe");

		if (savedPreferences) {
			try {
				const parsedPreferences: RememberMeData = JSON.parse(savedPreferences);

				if (parsedPreferences.emailLogin) {
					setValue("emailLogin", parsedPreferences.emailLogin);
				}
			} catch (error) {
				console.error("Failed to parse saved preferences:", error);
			}
		}
	}, [setValue]);
};
