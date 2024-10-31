import {HttpException, HttpStatus, Inject, Injectable, Scope} from '@nestjs/common';
import {HttpAdapterHost, REQUEST} from '@nestjs/core';
import bcrypt from 'bcrypt';
import {InjectModel} from 'nestjs-typegoose';
import type {ReturnModelType} from '@typegoose/typegoose';
import {InjectRedisClient} from 'nestjs-ioredis-tags';
import type {Redis} from 'ioredis';
import md5 from 'md5';
import type {ExpressAdapter} from '@nestjs/platform-express';
import {isEmail} from 'class-validator';
import {
  randstr as randomStringGenerator
} from 'better-randstr';
import {BCRYPT_SALT_ROUNDS} from '../constants.js';
import {HttpStatusMessages} from '../messages/http.js';
import {AuthRecoverDto, AuthSignInDto, AuthSignUpDto} from '../dto/Auth.js';
import {UserEntity, UserEntityDefaultSelect} from '../entities/User/index.js';
import {promiseMap} from '../utils/index.js';
import jwt from 'jsonwebtoken';
import {get} from 'lodash-es';
import fs from 'fs';
import {SmtpService} from './Smtp.js';
import {Types} from 'mongoose';
import { CrmService } from '../services/crm.service';  

@Injectable({scope: Scope.REQUEST})
export class AuthService {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly adapterHost: HttpAdapterHost<ExpressAdapter>,
    @InjectModel(UserEntity) private readonly repoUser: ReturnModelType<typeof UserEntity>,
    @Inject(SmtpService) private readonly smtp: SmtpService,
    @InjectRedisClient('rifify.ru') private readonly redisClient: Redis,
    private readonly crmService: CrmService  
  ) {
  }

  async signOut(userId?: Types.ObjectId): Promise<boolean> {
    try {
      return await new Promise((resolve, reject) => {
        this.request.session.destroy((err) => err ? reject(err) : resolve(true));
      });
    } catch (err) {
      console.error(err.message);
      //
    }
    return false;
  }

  async signInByEmail(args: any): Promise<UserEntity> {
    const keys = ['email', 'password'];
    const {
      email,
      password: passwordCheck
    } = Object.fromEntries(Object.entries(args).filter(([_, __]) => keys.includes(_))) as any;
    const user = await this.getUserByEmailOrUsername(email);
    if(user.password){
      await this.verifyUserPassword(user.password,passwordCheck);
    }else{
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        messages: [{
          messages: [HttpStatusMessages.INTERNAL_SERVER_ERROR]
        }]
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    this.request.session.user = {
      id: user._id,
      language: user.language,
      roles: user.roles,
      email: user.email
    };
    return user as UserEntity;
  }

  async signUpByEmail(args: AuthSignUpDto, ipRegLimit = true): Promise<UserEntity> {
    const keys = [
      'firstName',
      'lastName',
      // 'username',
      'email',
      'password',
      'phone',
      'consent'
    ];
    const data = Object.fromEntries(Object.entries(args).filter(([_, __]) => {
      switch (_) {
        case 'email':
        case 'phone':
          return Boolean(__);
        default:
          return keys.includes(_);
      }
    }));
    const ipReg = `ip.reg:${this.request.ip}`;
    const counter = await this.redisClient.get(ipReg);
    if (ipRegLimit) {
      // console.log(ipReg,counter);
      if (counter && Number(counter) > 10) {
        throw new HttpException({
          statusCode: HttpStatus.TOO_MANY_REQUESTS
        }, HttpStatus.TOO_MANY_REQUESTS);
      }
    }
    const user = await this.createUserByEmail({
      ...data,
      consent: true
    });
    this.request.session.user = {
      id: user._id,
      language: user.language,
      roles: user.roles
    };
    if (ipRegLimit) {
      await this.redisClient.set(
        ipReg,
        `${1 + (counter ? Number(counter) : 0)}`,
        'PX',
        24 * 60 * 60 * 1000
      );
    }
    return user;
  }

  async recover({
                  login: username,
                  recoverCode,
                  verifyCode
                }: AuthRecoverDto & {
    recoverCode?: string;
    verifyCode?: string;
  }): Promise<{ redirect: string }> {
    const user = username ? (await this.repoUser.findOne(isEmail(username) ? {email: username} : {username})) : null;
    if (!user && !(recoverCode && verifyCode)) {
      return {redirect: `${import.meta.env.VITE_FRONTEND_URL}/error?code=recover`};
    }
    const recoverExistRequest = (user ? md5(`${user.id}:email:recover`) : recoverCode) as string;
    const recoverExist = await this.redisClient.get(recoverExistRequest);
    if (user && recoverExist) {
      return {redirect: `${import.meta.env.VITE_FRONTEND_URL}/error?code=recover`};
    } else if (!recoverExist && user) {
      const recoverExistRequestVerify = md5(`${user.id}:email:recover:${randomStringGenerator()}`);
      await this.redisClient.set(
        recoverExistRequest,
        JSON.stringify({
          user: user,
          recoverExistRequestVerify
        }),
        'PX',
        24 * 60 * 60 * 1000
      );
      try {
        console.log('smtp');
        //language by user
        /*this.smtp
          .sendEmail('recover-by-email',{
            appeal:`${user.firstName||user.username||''}`,
            email:user.email,
            recoverExistRequest,
            recoverExistRequestVerify
          })
          .then();*/
      } catch (e) {
        console.error(e.message);
      }
    } else if (recoverExist && verifyCode) {
      const {user, recoverExistRequestVerify} = JSON.parse(recoverExist);
      if (verifyCode === recoverExistRequestVerify) {
        /*if(this.request.session.user&&this.request.session.user.id!==user.id){
          return {redirect:`${import.meta.env.VITE_FRONTEND_URL}/error?code=recover`};
        }*/
        this.request.session.user = user;
        await this.redisClient.del(recoverExistRequest);
        return {
          redirect: `${import.meta.env.VITE_FRONTEND_URL}/user/restorePassword`
        };
      } else {
        return {redirect: `${import.meta.env.VITE_FRONTEND_URL}/error?code=recover`};
      }
    }
    return {redirect: `${import.meta.env.VITE_FRONTEND_URL}/error?code=recover`};
  }

  private async createUserByEmail(args): Promise<UserEntity & { id?: string; _id?: Types.ObjectId }> {
    args.password = await bcrypt.hash(args.password, BCRYPT_SALT_ROUNDS);
    try {
      // return await this.repoUser.create(args);

      const user = await this.repoUser.create(args);

      const crmUserData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      };
      try {
        await this.crmService.createUserInCrm(crmUserData);  
      } catch (crmError) {
        console.error('Failed to create user in CRM:', crmError.message);
       
      }

      return user;


    } catch (e) {
      console.error(e.message);
      switch (e.code) {
        case 11000: {
          if ('email' in e.keyValue) throw new HttpException({
            statusCode: HttpStatus.BAD_REQUEST,
            messages: [{
              property: 'email',
              messages: [HttpStatusMessages.EMAIL_ALREADY_EXIST]
            }]
          }, HttpStatus.BAD_REQUEST);
          /*if ('username' in e.keyValue) throw new HttpException({
            statusCode: HttpStatus.BAD_REQUEST,
            messages: [{
              property: 'username',
              messages: [HttpStatusMessages.USERNAME_ALREADY_EXIST]
            }]
          }, HttpStatus.BAD_REQUEST);*/
          break;
        }
      }
      throw new Error('Internal server error');
    }
  }

  private async getUserByEmailOrUsername(login: string): Promise<UserEntity & { id?: string; _id: Types.ObjectId }> {
    let criteria = {};
    if (isEmail(login)) {
      criteria['email'] = login;
    } else {
      criteria['username'] = login;
    }
    const user = await this.repoUser
      .findOne(criteria)
      .select([...UserEntityDefaultSelect, 'password', 'roles']);
    if (!user) {
      throw new HttpException({
        statusCode: HttpStatus.UNAUTHORIZED,
        messages: [{
          messages: [HttpStatusMessages.UNAUTHORIZED]
        }]
      }, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async verifyUserPassword(password: string, passwordCheck: string): Promise<boolean> {
    const passwordMatches = await bcrypt.compare(passwordCheck, password);
    if (!passwordMatches) {
      throw new HttpException({
        statusCode: HttpStatus.UNAUTHORIZED,
        messages: [{
          messages: [HttpStatusMessages.UNAUTHORIZED]
        }]
      }, HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
