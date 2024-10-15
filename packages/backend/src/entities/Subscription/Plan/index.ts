import {index, modelOptions, prop} from '@typegoose/typegoose';
import {_BaseEntity} from '../../_BaseEntity.js';
import {defaultModelOptions, defaultSchemaOptions} from '../../../mongoose.config.js';


enum SUBSCRIPTION_PLAN_PERIOD {
  MONTH = 'month',
  HALF_YEAR = 'half-year',
  YEAR = 'year'
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
    collection: 'subscription-plan'

  },
  options: {
    customName: 'subscription-plan'
  }
})
export class SubscriptionPlanEntity extends _BaseEntity {
  @prop({
    required: true,
    enum: SUBSCRIPTION_PLAN_PERIOD,
  })
  period!: SUBSCRIPTION_PLAN_PERIOD;

  @prop({required: true})
  price!: number;

  @prop()
  discount?: number;

  @prop({required: true})
  limit!: number;
}


export const SubscriptionPlanEntityDefaultSelect = [
  'id',
  'period',
  'price',
  'discount',
  'limit',
];

export default SubscriptionPlanEntity;
