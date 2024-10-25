import {buildConfig} from '@stigma-io/payload/config';
import type {Config as ConfigPayload} from '@stigma-io/payload/config';
import {get, set} from 'lodash-es';
import path from 'path';
import Media from './collections/Media';
import User from './collections/User';
import BeforeLogin from './components/BeforeLogin';
import AfterDashboard from './components/AfterDashboard';
import BeforeDashboard from './components/BeforeDashboard';
import Photo from './collections/Photo';
import {LogoComponent, IconComponent} from './components/Logo/Logo';
import Pose from './collections/Pose';
import Video from './collections/Video';
import Audio from './collections/Audio';
import Model from './collections/Model';
import Voice from './collections/Voice';
import {Transition} from './collections/Transition';
import {cloudStorage} from './plugins/s3';
import {s3Adapter} from './plugins/s3/adapters/s3';
import AppScreens from './globals/AppScreens';
import CustomAccount from './components/views/CustomAccount';
import {viteBundler} from '@stigma-io/payload-bundler-vite';
import {lexicalEditor} from '@stigma-io/payload-richtext-lexical';
import {mongooseAdapter} from '@stigma-io/payload-db-mongodb';
import dirname from 'es-dirname';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import tailwindcssForms from '@tailwindcss/forms';
import type {InlineConfig as ConfigVite} from 'vite';
import tailwindcssNesting from 'tailwindcss/nesting/index.js';
import {mergeConfig} from 'vite';
import {userMediaAvatar} from './collections/user/media/avatar';
import Post from './collections/Post';
import PostMedia from './collections/PostMedia';

const __dirname = dirname();
const s3AdapterConfig = {
  forcePathStyle: true,
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
};

export const defaultPayloadConfig: ConfigPayload = {
  db: mongooseAdapter({
    url: process.env.MONGO_CONNECTION_STRING,
    // migrationDir: path.resolve(__dirname, 'migrations'),
    autoPluralization: false
  }),
  editor: lexicalEditor({}),
  routes: {
    api: '/api/admin',
    admin: '/admin'
  },
  serverURL: `http://localhost:${process.env.PORT || 2050}`,
  admin: {
    user: User.slug,
    meta: {
      titleSuffix: '- Admin',
      ogImage: `${__dirname}/client/static/assets/images/icon.png`,
      favicon: `${__dirname}/client/static/assets/images/icon.png`
    },
    css: `${__dirname}/styles/custom.scss`,
    components: {
      beforeLogin: [
        BeforeLogin
      ],
      beforeDashboard: [
        BeforeDashboard
      ],
      afterDashboard: [
        AfterDashboard
      ],
      beforeNavLinks: [
        // BeforeNavLinks
      ],
      graphics: {
        Logo: LogoComponent,
        Icon: IconComponent
      },
      views: {
        Account: CustomAccount
      }
    },
    bundler: viteBundler() as any,
    vite: (config) => {
      return mergeConfig(config, {
        server: {
          hmr: {
            port: 5020
          }
        },
        css: {
          transformer: 'postcss',
          postcss: {
            plugins: [
              tailwindcssNesting(),
              tailwindcss({
                darkMode: ['class', '[data-theme="dark"]'],
                content: [`${__dirname}/components/**/*.tsx`],
                corePlugins: {
                  preflight: true
                },
                plugins:[
                  tailwindcssForms()
                ],
              }),
              autoprefixer()
            ]
          }
        },
        optimizeDeps: {
          force: true,
          exclude: [
            'vite'
          ],
          include: [
            'tailwindcss'
          ]
        },
        resolve: {
          alias: [
            {
              find: 'vite',
              replacement: `${path.resolve(__dirname + '/..')}/mocks/vite.ts`
            },
            {
              find: /^tailwindcss$/,
              replacement: `${path.resolve(__dirname + '/..')}/mocks/emptyModule.ts`
            }
          ]
        },
      } satisfies ConfigVite);
    }
  },
  collections: [
    // Practise,
    // Pose,
    // Transition,
    // Model,
    // Voice,
    // Video,
    // Audio,
    // Media,
    // Photo,
    Post,
    PostMedia,
    User,
    userMediaAvatar,
  ],
  globals: [
    // AppScreens
  ],
  rateLimit: {
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
    max: 2400 // limit each IP per windowMs
  },
  plugins: [
    cloudStorage({
      collections: {
        ['user-media-avatar']: {
          adapter: s3Adapter({
            config: s3AdapterConfig,
            bucket: process.env.S3_BUCKET_USER_AVATAR
          })
        },
        ['post-media']: {
          adapter: s3Adapter({
            config: s3AdapterConfig,
            bucket: process.env.S3_BUCKET_USER_AVATAR
          })
        },
      }
    })
  ],
  localization: {
    defaultLocale: 'en',
    locales: [
      'en',
      'ru'
    ]
  },
  i18n: {
    fallbackLng: 'en',
    debug: false,
    supportedLngs: ['en', 'ru'],
    nonExplicitSupportedLngs: true,
    appendNamespaceToCIMode: false,
    resources: {
      en: {
        custom: {
          // namespace can be anything you want
          key1: 'Translation with {{variable}}' // translation
        },
        // override existing translation keys
        general: {
          dashboard: 'Home'
        }
      }
    },
    load: 'languageOnly',
    lowerCaseLng: true,
    cleanCode: true
  },
  // typescript: {
  // outputFile: path.resolve(__dirname, 'payload-types.ts')
  // },
  upload: {
    defCharset: 'utf8',
    defParamCharset: 'utf8'
  },
  graphQL: {
    disable: true,
    disablePlaygroundInProduction: true
  },
  onInit: (app) => {
    app.logger.info('Payload Initialized');
  }
};

export default buildConfig(defaultPayloadConfig);
