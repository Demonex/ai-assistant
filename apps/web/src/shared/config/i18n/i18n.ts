import i18n, { type Module } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { ru } from "./translations/ru.js";

i18n
	.use(LanguageDetector as unknown as Module)
	.use(initReactI18next)
	.init({
		debug: process.env.NODE_ENV === "development",
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
		resources: {
			ru,
		},
	});

export default i18n;
