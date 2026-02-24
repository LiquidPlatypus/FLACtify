import {defineConfig} from "@lingui/cli";

export default defineConfig({
	sourceLocale: "en",
	locales: ["fr", "en"],
	catalogs: [
		{
			path: "<rootDir>/src/locales/{locale}/message",
			include: ["src"],
		},
	],
});