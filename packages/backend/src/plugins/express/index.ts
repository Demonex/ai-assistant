import {Express} from 'express';
import cors from 'cors';
import session, {SessionData} from 'express-session';
import RedisStore from 'connect-redis';
import type {Redis} from 'ioredis';
import {TaggableCache as RedisTaggable} from 'cache-tags';
import cookieParser from 'cookie-parser';
import {get} from 'lodash-es';
import {REDIS_SESSION_PREFIX} from '../../constants.js';
import payloadInit from '@stigma-io/payload';
import {parse} from 'cookie';

const RedisTaggableClient: Redis & any = new RedisTaggable({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379
});
const RedisSessionStore = new RedisStore({
  client: RedisTaggableClient,
  prefix: REDIS_SESSION_PREFIX
});
RedisSessionStore.set = function (sid: string, sess: SessionData, cb?: (_err?: unknown, _data?: any) => any) {
  const $this = this;
  let args = [$this.prefix + sid];
  let value;
  try {
    value = $this.serializer.stringify(sess);
  } catch (er) {
    return cb(er);
  }
  args.push(value);
  args.push('EX', $this._getTTL(sess));
  const userId = get(sess, 'user.id');
  if (userId) {
    RedisTaggableClient.tags([userId]).set(args, cb);
  } else {
    $this.client.set(args, cb);
  }
};
const expressPlugins = async (express: Express) => {
  express.disable('x-powered-by');
  express.set('trust proxy', true);
  express.use(cors({
    origin: [`${process.env.SERVER_URL}`, `${process.env.FRONTEND_URL}`],
    allowedHeaders: [
      'Origin',
      'Keep-Alive',
      'User-Agent',
      'If-Modified-Since',
      'Cache-Control',
      'Content-Type',
      'X-Requested-With',
      'Accept',
      'Content-Encoding',
      'Cookie',
      'Set-Cookie',
      'Tus-Resumable',
      'Upload-Length',
      'Upload-Metadata',
      'Upload-Offset',
      //
      'last-modified',
      'if-none-match',
      'pragma',
      'e-tag',
      'expires',
      'age',
      'x-axios-cache-etag',
      'x-axios-cache-last-modified',
      'x-axios-cache-stale-if-error',
      'referer',
      'sec-ch-ua',
      'sec-ch-ua-mobile',
      'sec-ch-ua-platform',
    ],
    preflightContinue: true,
    credentials: true
  }));
  express.use(cookieParser());
  express.use((req, res, next) => {
    if ('OPTIONS' === req.method) {
      return res.sendStatus(204);
    }
    if ('authorization' in req.headers && !get(req, `cookies.${process.env.SESSIONS_KEY}`)) {
      const authorization = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
      if (!authorization) {
        return next();
      }
      const cookies = parse(get(req, 'headers.cookie', ''));
      cookies[`${process.env.SESSIONS_KEY}`] = authorization;
      req.headers['cookie'] = Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ');
    }
    return next();
  });
  express.use((req, res, next) => {
    let domain = process.env.SERVER_COOKIE_HOST || process.env.SERVER_HOST;
    // let webDomain = undefined;
    try {
      /*webDomain*/
      // domain = new URL(req.headers.origin || req.headers.referer).hostname;
    } catch (e) {
      // console.error(e)
    }
    /*switch(webDomain) {
      case 'app.musicstats.ru': {
        domain = '.musicstats.ru';
        break;
      }
    }*/
    const expressSession = session({
      name: process.env.SESSIONS_KEY,
      store: RedisSessionStore,
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        domain,
        // secure: true
        sameSite: 'lax'
      }
    });
    expressSession(req, res, next);
  });
  // console.log('payload skip');
  await payloadInit.init({
    secret: process.env.PAYLOAD_SECRET,
    express
  });
};
export default expressPlugins;
