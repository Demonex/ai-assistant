import {Module} from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose';
import {SubscriptionService} from '@repo/backend/services/Subscription';
import {SubscriptionController} from '@repo/backend/controllers/Subscription';
import SubscriptionEntity from '@repo/backend/entities/Subscription';
import SubscriptionPlanEntity from '@repo/backend/entities/Subscription/Plan';
import SubscriptionTransactionEntity from '@repo/backend/entities/Subscription/Transaction';

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
