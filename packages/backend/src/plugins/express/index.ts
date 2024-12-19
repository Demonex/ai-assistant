import type { Express } from "express";
import cors from "cors";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { Redis } from "ioredis";
import cookieParser from "cookie-parser";
import { REDIS_SESSION_PREFIX } from "@repo/backend/constants.js";

const redisClient = new Redis(
	`redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:6379`,
);
const RedisSessionStore = new RedisStore({
	client: redisClient,
	prefix: REDIS_SESSION_PREFIX,
});
const expressPlugins = (express: Express) => {
	express.disable("x-powered-by");
	express.set("trust proxy", true);
	express.use(
		cors({
			origin: [`${process.env.BACKEND_URL}`, `${process.env.FRONTEND_URL}`],
			allowedHeaders: [
				"Origin",
				"Keep-Alive",
				"User-Agent",
				"If-Modified-Since",
				"Cache-Control",
				"Content-Type",
				"X-Requested-With",
				"Accept",
				"Content-Encoding",
				"Cookie",
				"Set-Cookie",
				"Tus-Resumable",
				"Upload-Length",
				"Upload-Metadata",
				"Upload-Offset",
				//
				"last-modified",
				"if-none-match",
				"pragma",
				"e-tag",
				"expires",
				"age",
				"x-axios-cache-etag",
				"x-axios-cache-last-modified",
				"x-axios-cache-stale-if-error",
				"referer",
				"sec-ch-ua",
				"sec-ch-ua-mobile",
				"sec-ch-ua-platform",
			],
			preflightContinue: true,
			credentials: true,
		}),
	);
	express.use(cookieParser());
	express.use((req, res, next) => {
		if ("OPTIONS" === req.method) {
			res.sendStatus(204);
		}
		return next();
	});
	express.use((req, res, next) => {
		let domain = process.env.BACKEND_COOKIE_HOST || process.env.BACKEND_HOST;
		let webDomain: string = undefined;
		try {
			webDomain = new URL(req.headers.referer || req.headers.origin).hostname;
			if (webDomain) {
				domain = webDomain;
			}
		} catch (e) {
			// console.error(e)
		}
		if (webDomain?.endsWith(".rifify.me")) {
			domain = ".rifify.me";
		}
		const expressSession = session({
			name: process.env.SESSIONS_KEY,
			store: RedisSessionStore,
			secret: process.env.COOKIE_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
				domain,
				// secure: true
				sameSite: "lax",
			},
		});
		expressSession(req, res, next);
	});
};
export default expressPlugins;
