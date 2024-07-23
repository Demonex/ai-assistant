import type {
  CollectionAfterChangeHook,
  CollectionBeforeReadHook,
  CollectionConfig
} from '@stigma-io/payload/types';
import {get, pick} from 'lodash-es';
import defaultAccess from '../utilities/defaultAccess';
import AvatarCell from '../components/views/AvatarCell';
import {USER_CREATOR_STATUS, USER_LANGUAGES} from '../../entities/enums';

const beforeReadHook = ({doc}): CollectionBeforeReadHook => {
  return filterHiddenFields(doc);
};

const afterChangeHook = ({doc}): CollectionAfterChangeHook => {
  return filterHiddenFields(doc);
};

const User: CollectionConfig = {
  slug: 'user',
  admin: {
    hideAPIURL: true,
    useAsTitle: 'name',
    defaultColumns: [
      'avatar',
      'name',
      'username',
      'email',
      'language'
    ]
  },
  access: defaultAccess,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Info',
          description: 'Basic info of user.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  admin: {
                    width: '70%'
                  }
                },
                {
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'user-media-avatar',
                  admin: {
                    width: '30%',
                    components: {
                      Cell: AvatarCell
                    }
                  }
                }
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'username',
                  type: 'text',
                  admin: {
                    width: '50%'
                  }
                },
                {
                  name: 'email',
                  type: 'text',
                  admin: {
                    width: '50%'
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'creator',
          label: 'Creator Info & KYC', // required
          interfaceName: 'Creator',
          fields: [
            {
              name: 'status',
              type: 'select',
              options: Object.values(USER_CREATOR_STATUS)
            },
            {
              name: 'birthday',
              type: 'text'
            },
            {
              name: 'firstName',
              type: 'text'
            },
            {
              name: 'lastName',
              type: 'text'
            },
            {
              name: 'middleName',
              type: 'text'
            },
            {
              name: 'KYC',
              type: 'array',
              fields: [
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'user-media-kyc',
                  required: true
                }
              ]
            }
          ]
        },
        {
          label: 'Wallets',
          description: 'Wallets & balance',
          fields: [
            {
              name: 'wallet',
              type: 'group',
              fields: [
                {
                  name: 'balance',
                  type: 'number'
                }
              ]
            },
            {
              name: 'walletCreator',
              type: 'group',
              fields: [
                {
                  name: 'balance',
                  type: 'number'
                }
              ]
            }
          ]
        },
        {
          label: 'Extra',
          description: 'Additional params & UI settings',
          fields: [
            {
              name: 'background',
              type: 'upload',
              relationTo: 'user-media-background'
            },
            {
              name: 'location',
              type: 'text'
            },
            {
              name: 'bio',
              type: 'textarea'
            },
            {
              name: 'language',
              type: 'select',
              options: Object.values(USER_LANGUAGES)
            }
          ]
        }
      ]
    }
  ],
  hooks: {
    beforeRead: [
      // beforeReadHook
    ],
    afterChange: [
      // afterChangeHook
    ]
  }
};

function filterHiddenFields(doc): any {
  return pick(doc, [
    'id',
    'createdAt',
    'updatedAt',
    ...User.fields.reduce<string[]>((fields, field) => {
      if (get(field, 'hidden')) {
        return fields;
      }
      return [...fields, get(field, 'name')];
    }, [])
  ]);
}

export default User;
