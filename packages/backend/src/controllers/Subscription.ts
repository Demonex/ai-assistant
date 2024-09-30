import {Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post} from '@nestjs/common';
import {Authorized} from '../decorators/auth.js';
import {UserEmail, UserId} from '../decorators/user.js';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {Types} from 'mongoose';
import {SubscriptionService} from '../services/Subscription';
import {UpdateProfileSubscriptionDto} from '../dto/Profile';
import {HttpStatusMessages} from '../messages/http';
import md5 from 'md5';

@ApiTags('web', 'ios')
@Controller('/api/rest')
export class SubscriptionController {
  constructor(
    public service: SubscriptionService
  ) {
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'pay'})
  @Authorized()
  @Get('/pay')
  @HttpCode(200)
  async pay(
    @UserId() id?: Types.ObjectId
  ) {
    const merchant_login = 'analitica';
    const password_1 = 'A6VeSSiY429wKAhhf9Qw';
    const invid = Math.floor(Math.random() * 2147483647);
    const description = 'Подписка rifify.ru';
    const out_sum = '1';
    const signature_value = md5(`${merchant_login}:${out_sum}:${invid}:${password_1}`);
    const url = `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${merchant_login}&OutSum=${out_sum}&InvoiceID=${invid}&Description=${description}&SignatureValue=${signature_value}&Recurring=true`;
    return {url};
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'get subscriptions'})
  @Authorized()
  @Get('profile/subscriptions')
  @HttpCode(200)
  async findByUser(
    @UserId() id?: Types.ObjectId
  ) {
    return this.service.findByUser(id);
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'add subscription'})
  @Authorized()
  @Post('profile/subscription')
  @HttpCode(200)
  async subscribe(
    @Body() {artist}: UpdateProfileSubscriptionDto,
    @UserId() id?: Types.ObjectId,
    @UserEmail() email?: string
  ) {
    console.log('email', email);
    if(!email?.includes('@rifify.com')) {
      throw new HttpException({
        statusCode: HttpStatus.METHOD_NOT_ALLOWED,
        messages: [{
          property: 'paid',
          messages: [HttpStatusMessages.METHOD_NOT_ALLOWED]
        }]
      }, HttpStatus.METHOD_NOT_ALLOWED);
    }
    return this.service.subscribe(id, artist);
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'remove subscription'})
  @Authorized()
  @Delete('profile/subscription')
  @HttpCode(200)
  async unsubscribe(
    @Body() {artist}: UpdateProfileSubscriptionDto,
    @UserId() id?: Types.ObjectId
  ) {
    return this.service.unsubscribe(id, artist);
  }
}
