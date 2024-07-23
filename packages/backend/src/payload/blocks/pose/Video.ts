import {Block} from '@stigma-io/payload/types';

const Video: Block = {
  slug: 'video',
  labels: {
    singular: 'Video',
    plural: 'Videos'
  },
  fields: [
    {
      name: 'item',
      type: 'upload',
      relationTo: 'videos',
      required: true
    }
  ]
};
export default Video;
