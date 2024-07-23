import {GlobalConfig} from '@stigma-io/payload/types';

const AppScreens: GlobalConfig = {
  slug: 'appScreens',
  access: {
    read: () => true
  },
  admin: {
    hideAPIURL: true
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true
        },
        {
          name: 'tab-name',
          type: 'text',
          required: true
        },
        {
          name: 'icon-name',
          type: 'select',
          options: ['home', 'document-text-outline'],
          required: true
        },
        {
          name: 'content',
          type: 'richText',
          required: false
        }
      ]
    }
  ]
};

export default AppScreens;
