// storage-adapter-import-placeholder
import { s3Storage } from "@stigma.io/payloadcms-storage-s3";
// import sharp from 'sharp' // sharp-import
import path from "node:path";
import { buildConfig } from "payload";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";

import { user } from "./collections/user";
import { defaultLexical } from "@/fields/defaultLexical";
import { getServerSideURL } from "./utilities/getURL";
import { userMediaAvatar } from "@/collections/user/media/avatar";
import { tenantMedia } from "@/collections/tenant/media";
import { tenant } from "./collections/tenant";
import { model } from "./collections/model";
import { neuro } from "./collections/neuro";
import { collection } from "./collections/collection";
// import Logo from "@/components/Logo/Logo";
// import Icon from "@/components/Logo/Icon";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	db: postgresAdapter({
		pool: {
			connectionString: String(process.env.DATABASE_URI),
		},
	}),
	admin: {
		meta: {
			title: "Admin Panel",
			titleSuffix: "- Admin",
			description: "The best admin panel in the world",
			icons: [
				{
					rel: "icon",
					type: "image/png",
					url: "/icon.png",
				},
			],
		},
		components: {
			// The `BeforeLogin` component renders a message that you see while logging into your admin panel.
			// Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
			beforeLogin: ["@/components/BeforeLogin"],
			// The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
			// Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
			beforeDashboard: ["@/components/BeforeDashboard"],
			graphics: {
				Logo: "@/components/Logo/Logo#LogoComponent",
				Icon: "@/components/Logo/Logo#IconComponent",
			},
		},
		importMap: {
			baseDir: path.resolve(dirname),
		},
		user: user.slug,
		livePreview: {
			breakpoints: [
				{
					label: "Mobile",
					name: "mobile",
					width: 375,
					height: 667,
				},
				{
					label: "Tablet",
					name: "tablet",
					width: 768,
					height: 1024,
				},
				{
					label: "Desktop",
					name: "desktop",
					width: 1440,
					height: 900,
				},
			],
		},
	},
	// This config helps us configure global or default features that the other editors can inherit
	editor: defaultLexical,
	routes: {
		api: "/api",
		admin: "/admin",
	},
	serverURL: `http://localhost:${process.env.PORT || 2055}`,
	collections: [
		tenant,
		tenantMedia,
		user,
		userMediaAvatar,
		model,
		neuro,
		collection,
	],
	cors: [getServerSideURL()].filter(Boolean),
	globals: [],
	plugins: [
		s3Storage({
			collections: {
				[userMediaAvatar.slug]: {
					bucket: process.env.S3_BUCKET_USER_AVATAR,
				},
				[tenantMedia.slug]: {
					bucket: process.env.S3_BUCKET_TENANT_MEDIA,
				},
			},
			config: {
				credentials: {
					accessKeyId: process.env.S3_ACCESS_KEY_ID,
					secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
				},
				region: process.env.S3_REGION,
				endpoint: process.env.S3_ENDPOINT,
				forcePathStyle: true,
			},
		}),
	],
	secret: process.env.PAYLOAD_SECRET,
	// sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	localization: {
		defaultLocale: "en",
		locales: ["en", "ru"],
	},
	upload: {
		defCharset: "utf8",
		defParamCharset: "utf8",
	},
	graphQL: {
		disable: true,
		disablePlaygroundInProduction: true,
	},
	telemetry: false,
	onInit: (app) => {
		app.logger.info("Payload Initialized");
	},
});
