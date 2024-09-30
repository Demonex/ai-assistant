import {Module} from '@nestjs/common';
import {ProxyService} from '../services/Proxy.js';
import {ProxyController} from '../controllers/Proxy.js';
import {ProxyPaidController} from '../controllers/ProxyPaid';
import LogEntity from '../entities/Log';
import {TypegooseModule} from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([LogEntity])
  ],
  providers: [ProxyService],
  exports: [ProxyService],
  controllers: [ProxyController, ProxyPaidController]
})
export class ProxyModule {
}
