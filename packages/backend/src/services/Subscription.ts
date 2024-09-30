import {InjectModel} from 'nestjs-typegoose';
import type {ReturnModelType} from '@typegoose/typegoose';
import {Types} from 'mongoose';
import type {Redis} from 'ioredis';
import {InjectRedisClient} from 'nestjs-ioredis-tags';
import SubscriptionEntity, {SubscriptionEntityDefaultSelect} from '../entities/Subscription';

export class SubscriptionService {
  constructor(
    @InjectModel(SubscriptionEntity) private readonly repo: ReturnModelType<typeof SubscriptionEntity>,
    @InjectRedisClient('rifify.ru') private readonly redisClient: Redis
  ) {
  }

  async findByUser(user?: Types.ObjectId): Promise<any> {
    return this.repo.find({user}).select(SubscriptionEntityDefaultSelect);
  }

  async subscribe(user?: Types.ObjectId, artist?: string): Promise<any> {
    return this.repo.findOneAndUpdate({user, artist}, {}, {new: true, upsert: true}).select(SubscriptionEntityDefaultSelect);
  }

  async unsubscribe(user?: Types.ObjectId, artist?: string): Promise<any> {
    return this.repo.findOneAndDelete({user, artist}).select(SubscriptionEntityDefaultSelect);
  }


}
