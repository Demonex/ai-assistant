import {Module} from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose';
import {SubscriptionService} from '../services/Subscription';
import {SubscriptionController} from '../controllers/Subscription';
import SubscriptionEntity from '../entities/Subscription';
import SubscriptionPlanEntity from '../entities/Subscription/Plan';
import SubscriptionTransactionEntity from '../entities/Subscription/Transaction';

@Module({
  imports: [TypegooseModule.forFeature([
    SubscriptionEntity,
    SubscriptionPlanEntity,
    SubscriptionTransactionEntity
  ])],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {
}
