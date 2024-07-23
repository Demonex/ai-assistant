import {CollectionConfig} from '@stigma-io/payload/types';
import defaultAccess from '../utilities/defaultAccess';

const Pose: CollectionConfig = {
  slug: 'pose',
  admin: {
    hideAPIURL: true,
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'type',
      'movement',
      'level'
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
      relationTo: 'media',
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
        },
        {
          name: 'audio',
          type: 'group',
          fields: [
            {
              name: 'item',
              type: 'relationship',
              relationTo: 'voice'
            },
            {
              name: 'item',
              type: 'upload',
              relationTo: 'audio'
            }
          ]
        }
      ]
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      admin: {
        position: 'sidebar'
      },
      options: [
        {
          label: 'Standing',
          value: 'standing'
        },
        {
          label: 'Mid Level',
          value: 'mid-level'
        },
        {
          label: 'Seat',
          value: 'seating'
        },
        {
          label: 'Lying down',
          value: 'lying-down'
        }
      ]
    },
    {
      name: 'movement',
      type: 'select',
      required: true,
      admin: {
        position: 'sidebar'
      },
      options: [
        {
          label: 'Stretching',
          value: 'stretching'
        },
        {
          label: 'Active',
          value: 'active'
        },
        {
          label: 'Relax',
          value: 'relax'
        },
        {
          label: 'Shavasana',
          value: 'shavasana'
        }
      ]
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      admin: {
        position: 'sidebar'
      },
      options: [
        {
          label: 'Easy',
          value: 'easy'
        },
        {
          label: 'Normal',
          value: 'normal'
        },
        {
          label: 'Hard',
          value: 'hard'
        }
      ]
    },
    {
      name: 'style',
      type: 'select',
      required: true,
      admin: {
        position: 'sidebar'
      },
      options: [
        {
          label: 'Hatha',
          value: 'hatha'
        },
        {
          label: 'Yin',
          value: 'yin'
        }
      ]
    },
    {
      name: 'functionality',
      type: 'select',
      required: true,
      admin: {
        position: 'sidebar'
      },
      options: [
        {
          label: 'Forward bends and twists',
          value: 'forward-bends-and-twists'
        },
        {
          label: 'Backbends',
          value: 'backbends'
        },
        {
          label: 'Standing and seated',
          value: 'standing-and-seated'
        },
        {
          label: 'Inverted poses',
          value: 'inverted-poses'
        },
        {
          label: 'Restorative',
          value: 'restorative'
        }
      ]
    },
  ]
};

export default Pose;
