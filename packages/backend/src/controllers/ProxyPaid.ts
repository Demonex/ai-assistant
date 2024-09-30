import {
  Controller,
  Get,
  HttpCode, HttpException, HttpStatus
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ProxyService} from "../services/Proxy.js";
import {HttpStatusMessages} from '../messages/http';
import {UserEmail} from '../decorators/user';
import {Authorized} from '../decorators/auth';

@Controller('/api/rest/proxy-paid')
export class ProxyPaidController {
  constructor(
    public service: ProxyService
  ) {
  }

  @Authorized()
  @ApiTags('web')
  @Get('*')
  @HttpCode(200)
  async get(
    @UserEmail() email?: string
  ) {
    if(!email?.includes('@rifify.com')) {
      throw new HttpException({
        statusCode: HttpStatus.METHOD_NOT_ALLOWED,
        messages: [{
          property: 'paid',
          messages: [HttpStatusMessages.METHOD_NOT_ALLOWED]
        }]
      }, HttpStatus.METHOD_NOT_ALLOWED);
    }
    return this.service.paid();
  }
}
