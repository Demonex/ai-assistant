import {buildConfig}          from '@stigma-io/payload/config';
import {defaultPayloadConfig} from './payload.config';
import {Config}               from '@stigma-io/payload/config';

const configProduction: Config={
  ...defaultPayloadConfig,
  serverURL:`https://backend.rifify.me`
};
export default buildConfig(configProduction);
