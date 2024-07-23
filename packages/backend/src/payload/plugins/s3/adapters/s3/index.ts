import {S3ClientConfig, S3} from '@aws-sdk/client-s3';
import type {Adapter, GeneratedAdapter} from '../../types';
import {getGenerateURL} from './generateURL';
import {getHandler} from './staticHandler';
import {getHandleDelete} from './handleDelete';
import {getHandleUpload} from './handleUpload';

export interface Args {
  config: S3ClientConfig;
  bucket: string;
  acl?: 'private' | 'public-read';
}

export const s3Adapter =
  ({config = {}, bucket, acl}: Args): Adapter =>
    ({collection, prefix}): GeneratedAdapter => {
      let storageClient: S3 | null = null;
      const getStorageClient: () => S3 = () => {
        if (storageClient) return storageClient;
        storageClient = new S3(config);
        return storageClient;
      };

      return {
        handleUpload: getHandleUpload({
          collection,
          getStorageClient,
          bucket,
          acl,
          prefix
        }),
        handleDelete: getHandleDelete({getStorageClient, bucket}),
        generateURL: getGenerateURL({bucket, config}),
        staticHandler: getHandler({bucket, getStorageClient, collection})
      };
    };
