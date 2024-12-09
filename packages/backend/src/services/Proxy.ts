import {HttpException, HttpStatus, Inject, Injectable, Scope} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import got from 'got';
import {InjectRedis} from '@nestjs-modules/ioredis';
import type {Redis} from 'ioredis';
import md5 from 'md5';
import {InjectModel} from 'nestjs-typegoose';
import LogEntity from '@repo/backend/entities/Log';
import type {ReturnModelType} from '@typegoose/typegoose';
import {Types} from 'mongoose';
import SubscriptionEntity from '@repo/backend/entities/Subscription';

const getHeaders = () => ({
  'accept': 'application/json',
  'accept-encoding': 'gzip, deflate, br, zstd',
  'accept-language': 'en-US,en;q=0.9,ru;q=0.8',
  'content-type': 'application/json',
  'fe-build-timestamp': '1725897735',
  'fe-platform': 'web',
  'fe-version': '143',
  'origin': 'https://songstats.com',
  'priority': 'u=1, i',
  'referer': 'https://songstats.com/',
  'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
  'sec-ch-ua-Mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  'user-agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36`,
  'x-enigma': String(420 * Date.now() + 69).split('')
    .map(e => e.split('').map((e => e.charCodeAt(0))))
    .map(e =>
      ((x) => x.split('').map((_ => _.charCodeAt(0))))('<img src=\'/getbaited.jpg\' />')
        .reduce<any>(((_, t) => _ ^ t), e))
    .map(e => ('0' + Number(e).toString(16)).substr(-2))
    .join('')
});

@Injectable({scope: Scope.REQUEST})
export class ProxyService {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    @InjectRedis() private readonly redisClient: Redis,
    @InjectModel(LogEntity) private readonly repoLog: ReturnModelType<typeof LogEntity>,
    @InjectModel(SubscriptionEntity) private readonly repoSubscriptions: ReturnModelType<typeof SubscriptionEntity>
  ) {
  }

  async isSubscribed(user: Types.ObjectId, artist?: string) {
    if (!user || !artist) {
      return false;
    }
    return Boolean(await this.repoSubscriptions.exists({
      user,
      artists: artist,
      archived: {$ne: false}
    }));
  }

  async get() {
    const path = this.request.path.replace(/^\/api\/rest\/proxy/, '');
    const {query} = this.request;
    let response: any = {};
    const cacheKey = md5(JSON.stringify({path, query}));
    const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
    await this.repoLog.updateOne({
      ip: this.request.ip,
      request: JSON.stringify({path, query})
    }, {
      ip: this.request.ip,
      request: JSON.stringify({path, query}),
      $inc: {count: 1}
    }, {
      upsert: true
    });
    if (cache) {
      return cache;
    }
    if (path.includes('search/search_all')) {
      const proxyYandex = `https://translate.yandex.ru/translate?view=compact&url=${encodeURIComponent(`https://data.songstats.com${path}?${new URLSearchParams(query).toString()}`)}&lang=en-ru`;
      try {
        response = await got.get(proxyYandex, {
          responseType: 'json',
          resolveBodyOnly: true,
          followRedirect: true,
          headers: getHeaders()
        });
        if (response && Object.keys(response).length > 2) {
          await this.redisClient.set(cacheKey, JSON.stringify(response), 'PX', 1_000 * 60 * 60 * 24);
          return response;
        }
      } catch (e) {
        // console.error(e);
      }
      try {
        const proxyGoogle = `https://translate.google.com/translate?sl=auto&tl=en&hl=en&u=https://data.songstats.com${path}?${encodeURIComponent(new URLSearchParams(query).toString())}&client=webapp`;
        response = await got.get(proxyGoogle, {
          responseType: 'json',
          resolveBodyOnly: true,
          followRedirect: true,
          headers: getHeaders()
        });
        if (response && Object.keys(response).length > 2) {
          await this.redisClient.set(cacheKey, JSON.stringify(response), 'PX', 1_000 * 60 * 60 * 24);
          return response;
        }
      } catch (e) {
        // console.error(e);
      }
    }

    try {
      response = await got.get(`https://data.songstats.com${path}`, {
        headers: getHeaders(),
        searchParams: query,
        responseType: 'json',
        resolveBodyOnly: true
      });
      if (response && Object.keys(response).length > 2) {
        await this.redisClient.set(cacheKey, JSON.stringify(response), 'PX', 1_000 * 60 * 60 * 24);
      }
      return response;
    } catch (e) {
      console.error(e);
    }
    throw new HttpException({
      statusCode: HttpStatus.TOO_MANY_REQUESTS
    }, HttpStatus.TOO_MANY_REQUESTS);
  }

  async paid() {
    const path = this.request.path.replace(/^\/api\/rest\/proxy-paid/, '');
    const {query} = this.request;
    console.log(path, query);
    return got.get(`https://api.songstats.com/enterprise${path}`, {
      headers: {
        'content-type': 'application/json',
        apikey: '2f716a70-79c6-433a-b079-02efcbdc5c9f'
      },
      searchParams: query,
      responseType: 'json',
      resolveBodyOnly: true
    });
  }
}
