import type { CollectionConfig } from "payload";
import defaultAccess from "@/utilities/defaultAccess";


export const postMedia: CollectionConfig = {
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
    useAsTitle: 'filename',
    hidden:true
  },
  // file uploads are stored on the server by default, plugins are available for cloud storage
  // https://github.com/richardvanbergen/payload-plugin-cloud-storage as an example
  upload: {
    // from the imageSizes below, the admin UI will show this size for previewing
    // staticDir tell Payload where to store files to and allows them to be served
    // staticDir: path.resolve(__dirname, '../../../media'),
    // limit the types of files allowed and request validation
    mimeTypes: ['image/*'],
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
