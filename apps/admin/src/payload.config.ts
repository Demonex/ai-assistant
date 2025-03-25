// storage-adapter-import-placeholder
import { s3Storage } from "@stigma.io/payloadcms-storage-s3";
// import sharp from 'sharp' // sharp-import
import { postgresAdapter } from "@payloadcms/db-postgres";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";

import { tenantMedia } from "@/collections/tenant/media";
import { userMediaAvatar } from "@/collections/user/media/avatar";
import { defaultLexical } from "@/fields/defaultLexical";
import { chatMessage } from "./collections/chatMessage";
import { collection } from "./collections/collection";
import { doc } from "./collections/doc";
import { group } from "./collections/group";
import { model } from "./collections/model";
import { neuro } from "./collections/neuro";
import { provider } from "./collections/provider";
import { tenant } from "./collections/tenant";
import { user } from "./collections/user";
import { getServerSideURL } from "./utilities/getURL";
import defaultAccess, { isAuthorized } from "./utilities/defaultAccess";
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
		theme: "light",

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
			providers: ["@/components/ForceLightModeProvider"],
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
			// actions: ["@/components/CustomHeaderAction"],
			// header: ["@/components/ui/sonner"]
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
	serverURL:
		process.env.NEXT_PUBLIC_SERVER_URL ||
		`http://localhost:${process.env.PORT || 2055}`,
	collections: [
		tenant,
		tenantMedia,
		user,
		userMediaAvatar,
		model,
		neuro,
		collection,
		provider,
		doc,
		group,
		chatMessage,
	],
	cors: [getServerSideURL()].filter(Boolean),
	globals: [],
	plugins: [
		s3Storage({
			collections: {
				[userMediaAvatar.slug]: {
					bucket: process.env.S3_BUCKET_USER_MEDIA,
				},
				[tenantMedia.slug]: {
					bucket: process.env.S3_BUCKET_TENANT_MEDIA,
				},
				[doc.slug]: {
					bucket: process.env.S3_BUCKET_DOC_FILE,
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
	// localization: {
	// 	defaultLocale: "en",
	// 	locales: ["en", "ru"],
	// },
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
