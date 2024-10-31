import {CollectionConfig} from '@stigma-io/payload/types';
import defaultAccess from '../utilities/defaultAccess';

const PostMedia: CollectionConfig = {
  slug: 'post-media',
  hooks: {
    beforeRead: [
      ({
         doc,
         req
       }) => {
        if (req.payloadAPI !== 'local') {
          return;
        }
        doc['filename'] = encodeURI(doc['filename']);
      }
    ]
  },
  access: defaultAccess,
  admin: {
    hideAPIURL: true,
    useAsTitle: 'filename'
  },
  // file uploads are stored on the server by default, plugins are available for cloud storage
  // https://github.com/richardvanbergen/payload-plugin-cloud-storage as an example
  upload: {
    // from the imageSizes below, the admin UI will show this size for previewing
    /*adminThumbnail: 'thumbnail',
    // staticDir tell Payload where to store files to and allows them to be served
    // staticDir: resolve(__dirname, '../../../media'),
    // limit the types of files allowed and request validation
    // mimeTypes:['image/png','image/jpeg','image/svg+xml']
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
        height: 320
      },
      {
        name: 'portrait',
        width: 768,
        height: 1024
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080
      }
    ]*/
  },
  // upload collections inherit base fields for file information and imageSizes, then add your own for users to change
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      localized: true,
      type: 'text'
    }
  ]
};
export default PostMedia;
