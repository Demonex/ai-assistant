import {Access} from '@stigma-io/payload/config';
import {CollectionConfig} from '@stigma-io/payload/types';
// import {CookieStrategy} from '../_payload/auth/strategies/cookies';
import {get} from "lodash";
import defaultAccess from "../utilities/defaultAccess";

const Model: CollectionConfig = {
  slug: 'voice',
  admin: {
    hideAPIURL:true,
    useAsTitle: 'name',
    defaultColumns:[
      'name',
      'samples',
      'updatedAt'
    ]
  },
  access: defaultAccess,
  // auth enabled collections get email and other fields for secure authentication in addition to the fields you add
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'samples',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'audio',
          type: 'upload',
          relationTo: 'media',
          required: true
        }
      ]
    },
  ]
};
export default Model;
