import {MiddlewareConsumer,Module,NestModule,OnApplicationShutdown} from '@nestjs/common';
import {TypegooseModule}                                            from 'nestjs-typegoose';
import {Logger}                                                     from './config/logger/api-logger.js';
import {MONGO_CONFIG,MONGO_URI}                                     from './mongoose.config.js';
import * as modules                                                 from './modules.exported.js';
import {RedisModule}                                                from 'nestjs-ioredis-tags';
import {ScheduleModule}                                             from '@nestjs/schedule';
import { MailchimpModule } from '@mindik/mailchimp-nestjs';


@Module({
  imports:[
    TypegooseModule.forRoot(`${MONGO_URI}`,MONGO_CONFIG),
    MailchimpModule.forRoot(`${process.env.MAILCHIMP_TRANSACTIONAL_API_KEY}`),
    RedisModule.forRoot([
      {
        name:'rifify.ru',
        host:process.env.REDIS_HOST||'localhost',
        port:6379,
        password:''
      }
    ]),
    ScheduleModule.forRoot(),
    ...Object.values(modules)
  ],

})
export class AppModule implements NestModule,OnApplicationShutdown{
  onApplicationShutdown(signal?: string): void{
    if(signal){
      Logger.info(`Received shutdown signal: ${signal} 👋`);
    }
  }
  configure(_consumer: MiddlewareConsumer): any{
    //
  }
}
