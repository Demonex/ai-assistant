import {HttpException, HttpStatus, Inject, Injectable, Scope} from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import type {ReturnModelType} from '@typegoose/typegoose';
import {UserEntity, UserEntityDefaultSelect} from '../entities/User/index.js';
import {UpdateProfileAvatarDto, UpdateProfileDto} from '../dto/Profile.js';
import {Types} from 'mongoose';
import {get} from 'lodash-es';
import type {Redis} from 'ioredis';
import {InjectRedisClient} from 'nestjs-ioredis-tags';
import {HttpStatusMessages} from '../messages/http.js';
import {REQUEST} from '@nestjs/core';
// import payload from '@stigma-io/payload';
import payload from '@stigma-io/payload';

import jwt from 'jsonwebtoken';

@Injectable({scope: Scope.REQUEST})
export class UserService {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    @InjectModel(UserEntity) private readonly repo: ReturnModelType<typeof UserEntity>,
    @InjectRedisClient('musicstats.ru') private readonly redisClient: Redis
  ) {
  }

  async findById(id?: Types.ObjectId): Promise<UserEntity | null> {
    if (!id) return null;
    return this.repo.findById(id).select(UserEntityDefaultSelect);
  }

  async me(id?: Types.ObjectId, email?: string) {
    const isAdminRequest = String(get(this.request, 'headers.referer', '')).includes('/admin');
    if (!id && !isAdminRequest) {
      throw new HttpException({
        statusCode: HttpStatus.UNAUTHORIZED,
        messages: [{
          messages: [HttpStatusMessages.UNAUTHORIZED]
        }]
      }, HttpStatus.UNAUTHORIZED);
    } else if (!id && isAdminRequest) {
      return {user: null};
    }
    const user = await this.findByIdOrEmail(id, email);
    if (!user) {
      if (!isAdminRequest) {
        throw new HttpException({
          statusCode: HttpStatus.UNAUTHORIZED,
          messages: [{
            messages: [HttpStatusMessages.UNAUTHORIZED]
          }]
        }, HttpStatus.UNAUTHORIZED);
      }
      try {
        await new Promise(resolve => {
          this.request.session.destroy(() => resolve(true));
        });
      } catch (err) {
        console.error(err.message);
        //
      }
    }
    return isAdminRequest && user ? {
      collection: 'user',
      user: {
        id: user._id,
        email: user.email,
        roles: user.roles,
        _strategy: 'cookie'
      }
    } : user;
  }

  async findByIdAndUpdate(
    id: Types.ObjectId,
    args: UpdateProfileDto
  ): Promise<any | null> {
    const keys = [
      'email',
      'firstName',
      'lastName',
      'language',
      'hasFinishedQuiz'
    ];
    const data = Object.fromEntries(
      Object.entries(args).filter(([_, __]) => {
        switch (_) {
          default:
            return keys.includes(_);
        }
      })
    );
    const getUser = () => this.repo.findById(id).select(['email', 'providers']);
    let userData;
    const {providersSafe} = args;
    if (data.email || (Array.isArray(providersSafe) && providersSafe.length)) {
      userData = await getUser();
    }
    if (data.email) {
      const oldEmail = get(userData || (await getUser()), 'email');
      if (data.email !== oldEmail) {
        data['emailVerified'] = false;
      }
    }
    if (Array.isArray(providersSafe)) {
      const providers = get(userData || (await getUser()), 'providers');
      data['providers'] = (Array.isArray(providers) ? providers : []).reduce<string[]>((prev, provider) => {
        const providerSafe = provider.split('_').shift();
        if (providersSafe.includes(providerSafe)) {
          return [...prev, provider];
        }
        return prev;
      }, []);
    }
    try {
      const user = (await this.repo
        .findByIdAndUpdate(id, data, {new: true})
        .select(UserEntityDefaultSelect)).toJSON();
      if (!user) return null;
      this.request.session.user.language = user.language;

      user['photos'] = get(user, 'photos', []).map(photo => get(photo, 'photo', undefined)).filter(Boolean);
      return user;
    } catch (e) {
      console.error(e.message);
      switch (e.code) {
        case 11000: {
          if ('username' in e.keyValue)
            throw new HttpException({
              statusCode: HttpStatus.BAD_REQUEST,
              messages: [{
                property: 'username',
                messages: [HttpStatusMessages.USERNAME_ALREADY_EXIST]
              }]
            }, HttpStatus.BAD_REQUEST);
          break;
        }
      }
      throw new Error('Internal server error');
    }
  }

  async findByIdAndUpdateAvatar(
    userId: Types.ObjectId,
    {file}: UpdateProfileAvatarDto
  ): Promise<any | null> {
    const result = await payload.create({
      user: {
        id: userId
      },
      collection: 'user-media-avatar',
      data: {},
      file: {
        data: file.buffer,
        mimetype: file.mimetype,
        name: file.originalname,
        size: file.size
      }
    });
    if (result) {
      try {
        await this.repo.findByIdAndUpdate(userId, {
            avatar: result.id
          }
        );
      } catch (e) {
        console.error(e);
      }
      const select = (await this.repo.findById(userId).select(UserEntityDefaultSelect)).toJSON();
      /*select['photos'] = get(select, 'photos', []).map(photo => get(photo, 'photo', undefined)).filter(Boolean).map((rest) => ({
        ...rest,
        url: `${process.env.SERVER_URL}/media/${encodeURI(rest.filename)}`
      }));*/
      return select;
    }
    return null;
  }

  async findByIdAndDelete(
    userId: Types.ObjectId
  ): Promise<boolean> {
    try {
      await this.repo.findByIdAndDelete(userId);
      await new Promise((resolve, reject) => {
        this.request.session.destroy((err) => err ? reject(err) : resolve(true));
      });
    } catch (err) {
      console.error(err.message);
      //
    }
    return true;
  }

  async findByIdOrEmail(_id: Types.ObjectId, email?: string): Promise<any | null> {
    if (!_id && !email) return null;
    const select = await this.repo
      .findOne(
        _id && email
          ? {
            $or: [
              {
                _id
              },
              {
                email
              }
            ]
          }
          : _id
            ? {_id}
            : {email}
      )
      .select(UserEntityDefaultSelect).lean();
    if (select)
      select['photos'] = get(select, 'photos', []).map(photo => get(photo, 'photo', undefined)).filter(Boolean);
    // .populate('photos', PhotoEntityDefaultSelect)
    return select;
  }
}
