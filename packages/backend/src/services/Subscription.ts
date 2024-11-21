import {InjectModel} from 'nestjs-typegoose';
import type {ReturnModelType} from '@typegoose/typegoose';
import {Types} from 'mongoose';
import SubscriptionEntity, {SubscriptionEntityDefaultSelect} from '../entities/Subscription';
import SubscriptionPlanEntity, {SubscriptionPlanEntityDefaultSelect} from '../entities/Subscription/Plan';
import md5 from 'md5';
import {get} from 'lodash-es';
import SubscriptionTransactionEntity, {
  SubscriptionTransactionEntityDefaultSelect
} from '../entities/Subscription/Transaction';
import {SUBSCRIPTION_TRANSACTION_STATUS} from '../entities/enums';
import {SubscriptionUpdateDto} from '../dto/Subscription';
import {HttpException, HttpStatus} from '@nestjs/common';
import {HttpStatusMessages} from '../messages/http';

const generateInvoiceId = () => Math.floor(Math.random() * 2_147_483_647);

export class SubscriptionService {
  constructor(
    @InjectModel(SubscriptionEntity) private readonly repo: ReturnModelType<typeof SubscriptionEntity>,
    @InjectModel(SubscriptionPlanEntity) private readonly repoPlans: ReturnModelType<typeof SubscriptionPlanEntity>,
    @InjectModel(SubscriptionTransactionEntity) private readonly repoTransactions: ReturnModelType<typeof SubscriptionTransactionEntity>
  ) {
  }

  async plans(): Promise<any> {
    return this.repoPlans.find().select(SubscriptionPlanEntityDefaultSelect);
  }

  async findByUser(user?: Types.ObjectId): Promise<any> {
    return this.repo.find({user}).select([...SubscriptionEntityDefaultSelect.filter(_ => _ !== 'user'), 'createdAt']);
  }

  /*async subscribe(user?: Types.ObjectId, artist?: string): Promise<any> {
    return this.repo.findOneAndUpdate({user, artist}, {}, {
      new: true,
      upsert: true
    }).select(SubscriptionEntityDefaultSelect);
  }

  async unsubscribe(user?: Types.ObjectId, artist?: string): Promise<any> {
    return this.repo.findOneAndDelete({user, artist}).select(SubscriptionEntityDefaultSelect);
  }*/

  async purchase(userId: Types.ObjectId, planId: Types.ObjectId, artist?: string, subscription?: Types.ObjectId): Promise<any> {
    const plan = await this.repoPlans.findById(planId);
    if (!plan) {
      return null;
    }
    const login = 'analitica';
    const password = 'A6VeSSiY429wKAhhf9Qw';
    const description = 'Подписка rifify.me';
    const getInvoiceId = async () => {
      const invoiceId = generateInvoiceId();
      if (!await this.repoTransactions.exists({invoiceId})) {
        return invoiceId;
      }
      return getInvoiceId();
    };
    const id = await getInvoiceId();
    await this.repoTransactions.create({
      user: userId,
      subscription,
      invoiceId: id,
      sum: plan.price,
      plan: planId,
      artist
    });
    const price = /*plan.price*/'1.00';
    return {
      url: `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${login}&OutSum=${price}&InvoiceID=${id}&Description=${description}&SignatureValue=${md5(`${login}:${price}:${id}:${password}`)}&Recurring=true`
    };
  }

  async update(
    user: Types.ObjectId,
    subscription: Types.ObjectId,
    data: Pick<SubscriptionUpdateDto, 'renew' | 'archived'>
  ): Promise<any> {
    return this.repo.findOneAndUpdate({
      _id: subscription,
      user
    }, data, {new: true});
  }

  async addArtist(
    user: Types.ObjectId,
    subscription: Types.ObjectId,
    artist: string
  ): Promise<any> {
    const subscriptionFounded = await this.repo.findOne({
      _id: subscription,
      user
    });
    const {plan, artists} = subscriptionFounded;
    const limit = get(plan, 'limit', 1);
    if (!subscriptionFounded || artists.length >= limit) {
      throw new HttpException({
        statusCode: HttpStatus.METHOD_NOT_ALLOWED,
        messages: [{
          property: 'limit',
          messages: [HttpStatusMessages.METHOD_NOT_ALLOWED]
        }]
      }, HttpStatus.METHOD_NOT_ALLOWED);
    }
    return this.repo.findByIdAndUpdate(subscription, {
      $push: {
        artists: artist
      }
    }, {new: true});
  }

  async purchaseCallback(outSum: string, invId: string, signatureValue: string, skip = false): Promise<void> {
    const transaction = await this.repoTransactions.findOne({
      invoiceId: Number(invId)
    }).select(SubscriptionTransactionEntityDefaultSelect);
    if (!transaction) {
      return;
    }
    const pass = 'A6VeSSiY429wKAhhf9Qw';
    const verifyString = md5(`${outSum}:${invId}:${pass}`);
    if (signatureValue === verifyString || skip) {
      if (!transaction.subscription) {
        await Promise.all([
          this.repoTransactions.findByIdAndUpdate(transaction.id, {
            status: SUBSCRIPTION_TRANSACTION_STATUS.SUCCESS
          }),
          this.repo.create({
            user: transaction.user,
            artists: transaction.artist ? [transaction.artist] : [],
            plan: transaction.plan
          })
        ]);
      }
    } else {
      await this.repoTransactions.findByIdAndUpdate(transaction.id, {
        status: SUBSCRIPTION_TRANSACTION_STATUS.FAIL
      });
    }
  }
}
