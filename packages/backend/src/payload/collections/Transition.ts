import {CollectionConfig} from '@stigma-io/payload/types';
import defaultAccess from '../utilities/defaultAccess';

export const Transition: CollectionConfig = {
  slug: 'transition',
  admin: {
    hideAPIURL: true,
    useAsTitle: 'name',
    defaultColumns: [
      'name',
      'from',
      'to',
      'items',
    ]
  },
  access: defaultAccess,
  versions: {
    drafts: true
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'from',
      type: 'relationship',
      relationTo: 'pose',
      hasMany: true,
      required: true
    },
    {
      name: 'to',
      type: 'relationship',
      relationTo: 'pose',
      hasMany: true,
      required: true
    },
    {
      name: 'items',
      label: 'Items',
      type: 'array',
      minRows: 1,
      localized: true,
      fields: [
        {
          name: 'model',
          type: 'relationship',
          relationTo: 'model',
          required: true
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'video',
          required: true
        }
      ]
    },
  ]
};

