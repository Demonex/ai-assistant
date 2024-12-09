import {
  Controller,
  Get,
  HttpCode, HttpException, HttpStatus, Param, Query
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import type {ProxyService} from '@repo/backend/services/Proxy.js';
import {HttpStatusMessages} from '@repo/backend/messages/http';
import {UserEmail, UserId} from '@repo/backend/decorators/user';
import {Authorized} from '@repo/backend/decorators/auth';
import type {Types} from 'mongoose';

@ApiTags('proxy')
@Controller('/api/rest/proxy-paid')
export class ProxyPaidController {
  constructor(
    public service: ProxyService
  ) {
  }

  @Authorized()
  @Get('*')
  @HttpCode(200)
  async get(
    @UserId() user?: Types.ObjectId,
    @Query('songstats_artist_id') id?: string,
    @Query('songstats_collaborator_id') _id?: string
  ) {
    const isSubscribed = await this.service.isSubscribed(user, id || _id);
    if (!isSubscribed) {
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
