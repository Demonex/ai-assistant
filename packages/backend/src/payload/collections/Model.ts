import {CollectionConfig} from '@stigma-io/payload/types';
import defaultAccess from "../utilities/defaultAccess";

const Model: CollectionConfig = {
  slug: 'model',
  admin: {
    hideAPIURL:true,
    useAsTitle: 'name',
    defaultColumns: [
      'name',
      'photo',
      'updatedAt'
    ]
  },
  access: defaultAccess,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'photo',
      type: 'array',
      // minRows: 1,
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'photo',
          // required: true
        }
      ]
    },
  ]
};
export default Model;
