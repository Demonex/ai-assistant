import path from 'path';
import type {S3} from '@aws-sdk/client-s3';
import type {HandleDelete} from '../../types';

interface Args {
  getStorageClient: () => S3;
  bucket: string;
}

export const getHandleDelete = ({getStorageClient, bucket}: Args): HandleDelete => {
  return async ({filename, doc: {prefix = ''}}) => {
    await getStorageClient().deleteObject({
      Bucket: bucket,
      Key: path.posix.join(prefix, filename)
    });
  };
};
