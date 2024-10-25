import {index, modelOptions, prop} from '@typegoose/typegoose';
import type {Ref} from '@typegoose/typegoose';
import {_BaseEntity} from '../../_BaseEntity.js';
import {defaultModelOptions, defaultSchemaOptions} from '../../../mongoose.config.js';
import UserEntity from '../../User';
import SubscriptionEntity from '../index';
import SubscriptionPlanEntity from '../Plan';


enum SUBSCRIPTION_TRANSACTION_STATUS {
  SUCCESS = 'success',
  FAIL = 'fail',
}

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
    collection: 'subscription-transaction'

  },
  options: {
    customName: 'subscription-transaction'
  }
})
@index(
  {invoiceId: 1},
  {
    unique: true,
    background: true
  }
)
export class SubscriptionTransactionEntity extends _BaseEntity {
  @prop({
    enum: SUBSCRIPTION_TRANSACTION_STATUS,
    addNullToEnum: true
  })
  status?: SUBSCRIPTION_TRANSACTION_STATUS;

  @prop({
    required: true,
    ref: () => UserEntity
  })
  user!: Ref<UserEntity>;

  @prop({
    required: true,
    ref: () => SubscriptionPlanEntity
  })
  plan!: Ref<SubscriptionPlanEntity>;

  @prop({
    ref: () => SubscriptionEntity
  })
  subscription?: Ref<SubscriptionEntity>;

  @prop({
    required: true
  })
  invoiceId!: number;

  @prop({
    required: true
  })
  sum!: number;

  @prop()
  artist?: string;
}


export const SubscriptionTransactionEntityDefaultSelect = [
  'id',
  'status',
  'user',
  'invoiceId',
  'sum',
  'artist',
  'plan'
];

export default SubscriptionTransactionEntity;
