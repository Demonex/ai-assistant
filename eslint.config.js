import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
	{
		ignores: [
			"/dist/",
			"/node_modules/",
			"/libs/",
			"/docker/",
			"/packages/common/",
			"/apps/admin/node_modules",
			"/apps/admin/docker/",
			"/apps/admin/src/app/(payload)/",
			"/apps/admin/src/payload-types.ts",
			"/apps/web/docker/",
			"/apps/web/node_modules/",
		],
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
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
			semi: ["error", "always"],
		},
	},
];
