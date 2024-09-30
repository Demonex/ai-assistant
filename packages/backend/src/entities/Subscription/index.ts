import type {Ref} from '@typegoose/typegoose';
import {index, modelOptions, prop} from '@typegoose/typegoose';
import {_BaseEntity} from '../_BaseEntity.js';
import {defaultModelOptions, defaultSchemaOptions} from '../../mongoose.config.js';
import UserEntity from '../User';


@modelOptions({
  ...defaultModelOptions,
  schemaOptions: {
    ...defaultSchemaOptions,
    toJSON: {
      ...defaultSchemaOptions.toJSON,
      virtuals: true,
      transform: (doc, {_id, createdAt, updatedAt, ...rest}) => ({
        id: _id,
        createdAt,
        updatedAt,
        ...rest
      })
    },
    collection: 'subscription'

  },
  options: {
    customName: 'subscription'
  }
})
@index(
  {user: 1, artist: 1},
  {
    unique: true,
    background: true
  }
)
export class SubscriptionEntity extends _BaseEntity {
  @prop({
    ref: () => UserEntity
  })
  user?: Ref<UserEntity>;
  @prop()
  artist?: string;
}


export const SubscriptionEntityDefaultSelect = [
  'id',
  'user',
  'artist',
];

export default SubscriptionEntity;
