import {modelOptions, prop} from '@typegoose/typegoose';
import {_BaseEntity} from '../../_BaseEntity.js';
import {defaultModelOptions, defaultSchemaOptions} from '../../../mongoose.config.js';


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
    collection: 'user-media-avatar'
  }
})
export class UserAvatarEntity extends _BaseEntity {
  @prop({required: true})
  filename!: string;
  @prop({required: true})
  filesize!: number;
  @prop({required: true})
  mimeType!: string;

  get url(): string {
    return `${import.meta.env.VITE_SERVER_URL}/user-media-avatar/${encodeURI(this.filename)}`;
  }
}

export const UserAvatarEntityDefaultSelect = [
  'id',
  'filename',
  'filesize',
  'mimeType'
];
export default UserAvatarEntity;
