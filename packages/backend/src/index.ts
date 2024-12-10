import "reflect-metadata";
import { HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
	ExpressAdapter,
	type NestExpressApplication,
} from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "@repo/backend/app.module.js";
import { Logger, LogLevel } from "@repo/backend/config/logger/api-logger.js";
import { DefaultLogger } from "@repo/backend/config/logger/default-logger.js";
import type { Express } from "express";
import express from "express";
import expressPlugins from "@repo/backend/plugins/express/index.js";

Logger.useLogger(
	new DefaultLogger({
		level: process.env.LOGGER_LEVEL
			? Number(process.env.LOGGER_LEVEL)
			: LogLevel.Info,
	}),
);
Logger.info(`Bootstrapping repo.dev (pid: ${process.pid}) 🚀`);
DefaultLogger.hideNestBootstrapLogs();
const expressApp: Express = express();
expressPlugins(expressApp);
const adapter = new ExpressAdapter(expressApp);
const app = await NestFactory.create<NestExpressApplication>(
	AppModule,
	adapter,
	{
		logger: new Logger(),
	},
);
app.useGlobalPipes(
	new ValidationPipe({
		transform: true,
		whitelist: true,
		exceptionFactory: (errors) => {
			// console.log('errors', errors);
			const result = errors.map((error) => ({
				property: error.property,
				messages: Object.values(error.constraints as never),
			}));
			return new HttpException(
				{
					statusCode: HttpStatus.BAD_REQUEST,
					messages: result,
				},
				HttpStatus.BAD_REQUEST,
			);
		},
	}),
);
SwaggerModule.setup(
	"/api/playground/rest",
	app,
	SwaggerModule.createDocument(
		app,
		new DocumentBuilder()
			.setTitle("repo.dev API")
			.setDescription(
				`Backend API for <a href="https://backend.repo.dev" target="_blank">https://backend.repo.dev</a>`,
			)
			.addBearerAuth(
				{
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
					in: "header",
				},
				"bearer-sid",
			)
			.setVersion("0.0")
			.build(),
	),
);

await app.listen(
	Number.parseInt(String(process.env.PORT)) || 2050,
	"0.0.0.0",
	() => {
		DefaultLogger.restoreOriginalLogLevel();
		logWelcomeMessage();
	},
);
app.enableShutdownHooks();

function logWelcomeMessage() {
	const version = "1.0.0";
	Logger.info("=================================================");
	Logger.info(
		`BACKEND (v: ${version}) now running on port ${Number.parseInt(String(process.env.PORT)) || 2050} ✨`,
	);
	Logger.info(
		`SWAGGER: http://localhost:${Number.parseInt(String(process.env.PORT))}/api/playground/rest`,
	);
	Logger.info("=================================================");
}
