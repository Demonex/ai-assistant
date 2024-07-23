import {Block} from '@stigma-io/payload/types';

const Video: Block = {
  slug: 'audio',
  labels: {
    singular: 'Audio',
    plural: 'Audios'
  },
  fields: [
    {
      name: 'item',
      type: 'relationship',
      relationTo: 'voice',
      required: true
    },
    {
      name: 'item',
      type: 'upload',
      relationTo: 'audios',
      required: true
    }
  ]
};
export default Video;
