import type Express from "express";
import cors from "cors";
import session from "express-session";
import { RedisStore } from "connect-redis";
import Redis from "ioredis";
import cookieParser from "cookie-parser";
import memoize from "memoizee";
import { REDIS_SESSION_PREFIX } from "@repo/backend/constants.js";
import { type OpenAPIObject } from "@nestjs/swagger";

const redisClient = new Redis(
	`redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
);
const RedisSessionStore = new RedisStore({
	client: redisClient,
	prefix: REDIS_SESSION_PREFIX,
});

export const spotlightElements = (
	express: Express,
	swaggerDoc: OpenAPIObject,
) => {
	express.use((req, res, next) => {
		if (req.path !== "/api/playground/rest/dark") {
			return next();
		}
		res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>REST API DOC</title>
        <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
        <style>a[href^="https://stoplight.io"]{display:none!important;}</style>
      </head>
      <body>
        <elements-api style="display: block; height: 100vh;"
          apidescriptiondocument='${JSON.stringify(swaggerDoc)}'
          router="hash"
          layout="sidebar"
        />
      </body>
    </html>
    `);
	});
};

const expressSession = memoize(
	(domain = "") => {
		return session({
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
	},
	{
		length: 1,
		primitive: true,
	},
);
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
		expressSession(domain)(req, res, next);
	});
};
export default expressPlugins;
