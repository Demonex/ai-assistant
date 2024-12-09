import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Redirect
} from '@nestjs/common';
import {Authorized} from '@repo/backend/decorators/auth.js';
import {UserEmail, UserId} from '@repo/backend/decorators/user.js';
import {ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import type {Types} from 'mongoose';
import type {SubscriptionService} from '@repo/backend/services/Subscription';
import {UpdateProfileSubscriptionDto} from '@repo/backend/dto/Profile';
import {HttpStatusMessages} from '@repo/backend/messages/http';
import type {SubscriptionPurchaseCallbackDto, SubscriptionPurchaseDto, SubscriptionUpdateDto} from '@repo/backend/dto/Subscription';
import {ParseObjectIdPipe} from '@repo/backend/middlewares/ParseObjectIdPipe';

@ApiTags('subscription')
@Controller('/api/rest')
export class SubscriptionController {
  constructor(
    public service: SubscriptionService
  ) {
  }

  @Get('subscription/plans')
  @HttpCode(200)
  async signIn() {
    return this.service.plans();
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'purchase'})
  @Authorized()
  @Post('subscription/purchase')
  @HttpCode(200)
  async purchase(
    @Body() {subscription, plan, artist}: SubscriptionPurchaseDto,
    @UserId() id: Types.ObjectId
  ) {
    return this.service.purchase(id, plan, artist, subscription);
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'purchase callback'})
  @Post('subscription/purchase/callback')
  @Redirect(`${process.env.FRONTEND_URL || '/'}/account`, HttpStatus.SEE_OTHER)
  @ApiResponse({status: HttpStatus.SEE_OTHER})
  async purchaseCallback(
    @Body() body: SubscriptionPurchaseCallbackDto
  ) {
    const {OutSum, InvId, SignatureValue, skip} = body;
    return this.service.purchaseCallback(OutSum, InvId, SignatureValue, skip);
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'update'})
  @ApiParam({
    name: 'id',
    type: String
  })
  @Authorized()
  @Put('subscription/:id/update')
  @HttpCode(200)
  async update(
    @Param('id', ParseObjectIdPipe) subscription: Types.ObjectId,
    @Body() data: SubscriptionUpdateDto,
    @UserId() id: Types.ObjectId
  ) {
    return this.service.update(id, subscription, data);
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'update'})
  @ApiParam({
    name: 'subscription',
    type: String
  })
  @ApiParam({
    name: 'artist',
    type: String
  })
  @Authorized()
  @Post('subscription/:subscription/artist/:artist')
  @HttpCode(200)
  async addArtist(
    @Param('subscription', ParseObjectIdPipe) subscription: Types.ObjectId,
    @Param('artist') artist: string,
    @UserId() id: Types.ObjectId
  ) {
    return this.service.addArtist(id, subscription, artist);
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

  /*@ApiBearerAuth('bearer-sid')
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
    if (!email?.includes('@rifify.com')) {
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
  }*/
}
