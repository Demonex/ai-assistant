import {CollectionConfig} from '@stigma-io/payload/types';
import defaultAccess from "../utilities/defaultAccess";
import Video from '../blocks/pose/Video';
import Audio from '../blocks/pose/Audio';

const Practise: CollectionConfig = {
  // the slug is used for naming the collection in the database and the APIs that are open. For example: api/posts/${id}
  slug: 'practise',
  admin: {
    hideAPIURL: true,
    // this is the name of a field which will be visible for the edit screen and is also used for relationship fields
    useAsTitle: 'title',
    // defaultColumns is used on the listing screen in the admin UI for the collection
    defaultColumns: [
      'title',
      'description',
    ],
  },
  access: defaultAccess,
  // versioning with drafts enabled tells Payload to save documents to a separate collection in the database and allow publishing
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      required: true,
      localized: true,
      fields: [
        {
          name: 'pose',
          type: 'relationship',
          relationTo: 'pose',
          required: true
        }
      ],
    },
  ],
}

export default Practise;
