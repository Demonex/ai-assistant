import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Request,
  Res
} from '@nestjs/common';
import {AuthRecoverDto, AuthSignInDto, AuthSignUpDto, PayloadSignInDto} from '../dto/Auth.js';
import {AuthService} from '../services/Auth.js';
import {Authorized, Unauthorized} from '../decorators/auth.js';
import {UserId} from '../decorators/user.js';
import jwt from 'jsonwebtoken';
import {ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import type {RedirectResponse} from '@nestjs/core/router/router-response-controller.js';
import {validateDto} from '../middlewares/validateDto.js';
import {Types} from "mongoose";

@ApiTags('auth')
@Controller('/api')
export class AuthController {
  constructor(
    public service: AuthService
  ) {
  }

  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'sign-out user'})
  @Authorized()
  @Post('/rest/auth/sign-out')
  @HttpCode(200)
  async signOut(
    @UserId() userId: Types.ObjectId
  ) {
    const result = await this.service.signOut();
    return {
      success: result
    };
  }

  @ApiExcludeEndpoint(import.meta.env.VITE_ENV !== 'development')
  @Authorized()
  @Post('/admin/user/logout')
  @HttpCode(200)
  async logOut(@UserId() userId: Types.ObjectId) {
    const result = await this.service.signOut();
    return {
      success: result
    };
  }

  @Unauthorized()
  @Post('/rest/auth/email/sign-in')
  @HttpCode(200)
  async signIn(@Request() request: any, @Body() args: AuthSignInDto) {
    await validateDto(AuthSignInDto, args, request);
    const profile = await this.service.signInByEmail(args);
    return profile;
  }

  @Unauthorized()
  @Post('/admin/user/login')
  @ApiExcludeEndpoint(import.meta.env.VITE_ENV !== 'development')
  @HttpCode(200)
  async login(
    @Request() request: any,
    @Body() body
  ) {
    const user = await this.service.signInByEmail({
      email: body.email,
      password: body.password
    } as any);
    const data = {
      id: user.id,
      email: user.email,
      roles: user.roles
    };
    const token = jwt.sign(
      data,
      `${import.meta.env.VITE_PAYLOAD_SECRET}`,
      {
        expiresIn: 7200
      }
    );
    return {
      exp: new Date().getTime(),
      message: 'Auth passed',
      token,
      user: {
        ...data,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        loginAttempts: 0
      }
    };
  }

  @Unauthorized()
  @Post('/rest/auth/email/sign-up')
  async signUp(@Request() request: any, @Body() args: AuthSignUpDto) {
    await validateDto(AuthSignUpDto, args, request);
    const profile = await this.service.signUpByEmail(args, false);
    return profile;
  }

  @Get('/rest/auth/activate/:link')
  async activate(@Param('link') link: string, @Res() res) {
    await this.service.activateAccount(link);
    return res.redirect(import.meta.env.VITE_FRONTEND_URL);
  }

  @Unauthorized()
  @Post('/rest/auth/email/recover')
  @HttpCode(200)
  async recover(@Request() request: any, @Body() args: AuthRecoverDto) {
    await validateDto(AuthRecoverDto, args, request);
    await this.service.recover(args);
    return {
      success: true
    };
  }

  @ApiExcludeEndpoint(import.meta.env.VITE_NODE_ENV !== 'development')
  @Get('/rest/auth/email/recover/:code/:state')
  @Redirect(`${import.meta.env.VITE_FRONTEND_URL || '/'}`, HttpStatus.SEE_OTHER)
  @ApiResponse({status: HttpStatus.SEE_OTHER})
  async recoverVerify(@Param('code') recoverCode: string, @Param('state') verifyCode: string): Promise<RedirectResponse> {
    const url = (await this.service.recover({recoverCode, verifyCode})).redirect;
    return {
      url,
      statusCode: HttpStatus.SEE_OTHER
    };
  }
}
