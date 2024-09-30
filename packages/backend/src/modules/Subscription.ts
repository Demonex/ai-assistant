import {Module} from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose';
import {SubscriptionService} from '../services/Subscription';
import {SubscriptionController} from '../controllers/Subscription';
import SubscriptionEntity from '../entities/Subscription';

@Module({
  imports: [TypegooseModule.forFeature([SubscriptionEntity])],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {
}
