import {Block} from '@stigma-io/payload/types';

const Pose: Block = {
  slug: 'pose',
  labels: {
    singular: 'Pose',
    plural: 'Poses'
  },
  fields: [
    {
      name: 'item',
      type: 'relationship',
      relationTo: 'pose',
      required: true
    }
  ]
};
export default Pose;
