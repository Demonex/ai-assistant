import {Module} from '@nestjs/common';
import {ProxyService} from '../services/Proxy.js';
import {ProxyController} from '../controllers/Proxy.js';
import {ProxyPaidController} from '../controllers/ProxyPaid';
import LogEntity from '../entities/Log';
import {TypegooseModule} from 'nestjs-typegoose';
import SubscriptionEntity from '../entities/Subscription';
import SubscriptionPlanEntity from '../entities/Subscription/Plan';

@Module({
  imports: [
    TypegooseModule.forFeature([
      LogEntity,
      SubscriptionEntity,
      SubscriptionPlanEntity
    ])
  ],
  providers: [ProxyService],
  exports: [ProxyService],
  controllers: [ProxyController, ProxyPaidController]
})
export class ProxyModule {
}
