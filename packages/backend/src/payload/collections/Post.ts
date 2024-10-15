import {CollectionConfig} from '@stigma-io/payload/types';
import defaultAccess from '../utilities/defaultAccess';

const Post: CollectionConfig = {
  slug: 'post',
  admin: {
    hideAPIURL: true,
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'description',
      'preview',
    ]
  },
  access: defaultAccess,
  versions: {
    drafts: true
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'description',
      type: 'text',
      localized: true
    },
    {
      name: 'preview',
      type: 'upload',
      relationTo: 'post-media',
    },
    {
      name: 'content',
      type: 'richText',
      required: false
    }
  ]
};

export default Post;
