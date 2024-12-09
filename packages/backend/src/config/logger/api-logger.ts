import type { LoggerService } from "@nestjs/common";

export enum LogLevel {
	Error = 0,
	Warn = 1,
	Info = 2,
	Verbose = 3,
	Debug = 4,
}

export type ApiLogger = {
	error(message: string, context?: string, trace?: string): void;
	warn(message: string, context?: string): void;
	info(message: string, context?: string): void;
	verbose(message: string, context?: string): void;
	debug(message: string, context?: string): void;
};

const noopLogger: ApiLogger = {
	error() {
		/* */
	},
	warn() {
		/* */
	},
	info() {
		/* */
	},
	verbose() {
		/* */
	},
	debug() {
		/* */
	},
};

export class Logger implements LoggerService {
	private static _instance: typeof Logger = Logger;
	private static _logger: ApiLogger = noopLogger;
	static get logger(): ApiLogger {
		return Logger._logger || noopLogger;
	}
	private get instance(): typeof Logger {
		const { _instance } = Logger;
		return _instance;
	}
	static useLogger(logger: ApiLogger) {
		Logger._logger = logger;
	}
	error(message: string, trace?: string, context?: string): void {
		this.instance.error(message, context, trace);
	}
	warn(message: string, context?: string): void {
		this.instance.warn(message, context);
	}
	log(message: string, context?: string): void {
		this.instance.info(message, context);
	}
	verbose(message: string, context?: string): void {
		this.instance.verbose(message, context);
	}
	debug(message: string, context?: string): void {
		this.instance.debug(message, context);
	}
	static error(message: string, context?: string, trace?: string): void {
		Logger.logger.error(message, context, trace);
	}
	static warn(message: string, context?: string): void {
		Logger.logger.warn(message, context);
	}
	static info(message: string, context?: string): void {
		Logger.logger.info(message, context);
	}
	static verbose(message: string, context?: string): void {
		Logger.logger.verbose(message, context);
	}
	static debug(message: string, context?: string): void {
		Logger.logger.debug(message, context);
	}
}
