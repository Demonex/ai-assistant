import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express';
// import payload from '@stigma-io/payload';
import express, {Express} from 'express';
import mongoose from 'mongoose';
import {Logger, LogLevel} from './config/logger/api-logger.js';
import {DefaultLogger} from './config/logger/default-logger.js';
import expressPlugins from './plugins/express/index.js';
import {AppModule} from './app.module.js';
import {BadRequestException, HttpException, HttpStatus, ValidationPipe} from '@nestjs/common';
import {HttpStatusMessages} from './messages/http.js';

mongoose.pluralize(null);
Logger.useLogger(
  new DefaultLogger({
    level: import.meta.env.VITE_LOGGER_LEVEL ? Number(import.meta.env.VITE_LOGGER_LEVEL) : LogLevel.Info
  })
);
Logger.info(`Bootstrapping rifify.me (pid: ${process.pid}) 🚀`);
DefaultLogger.hideNestBootstrapLogs();
const expressApp: Express = express();
const adapter = new ExpressAdapter(expressApp);
const app = await NestFactory.create<NestExpressApplication>(AppModule, adapter, {
  logger: new Logger()
});
await expressPlugins(expressApp);
app.useGlobalPipes(new ValidationPipe({
  transform: true,
  whitelist: true,
  exceptionFactory: (errors) => {
    // console.log('errors', errors);
    const result = errors.map((error) => ({
      property: error.property,
      messages: Object.values(error.constraints)
    }));
    return new HttpException({
      statusCode: HttpStatus.BAD_REQUEST,
      messages: result
    }, HttpStatus.BAD_REQUEST);
  }
}));
SwaggerModule.setup('/api/playground/rest', app, SwaggerModule.createDocument(app, new DocumentBuilder()
  .setTitle('rifify.me API')
  .setDescription(
    `Backend API for <a href="https://backend.rifify.me" target="_blank">https://backend.musicstats.ru</a>`
  )
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header'
  }, 'bearer-sid')
  .setVersion('0.0')
  .build()));

// await app.listen(parseInt(String(import.meta.env.VITE_PORT)) || 2050, '0.0.0.0', async () => {
//   DefaultLogger.restoreOriginalLogLevel();
//   logWelcomeMessage();
// });

app.enableShutdownHooks();

export const viteNodeApp = app;

function logWelcomeMessage() {
  const version = '1.0.0';
  Logger.info(`=================================================`);
  Logger.info(`BACKEND (v: ${version}) now running on port ${parseInt(String(import.meta.env.VITE_PORT)) || 2050} ✨`);
  // Logger.info(`SWAGGER: ${payload.getAPIURL().replace('/api/admin', '/api/playground/rest')}`);
  // Logger.info(`ADMIN: ${payload.getAdminURL()}`);
  Logger.info(`http://localhost:${parseInt(String(import.meta.env.VITE_PORT)) || 2050}/api/playground/rest`);
  Logger.info(`=================================================`);
}
