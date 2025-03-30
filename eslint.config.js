import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
	{
		ignores: ["/dist/", "/node_modules/", "/libs/"],
	},
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: true,
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
		},
		rules: {
			...tsPlugin.configs["recommended"].rules,
			"@typescript-eslint/no-unused-vars": "warn",
			semi: ["error", "always"],
		},
	},
];
