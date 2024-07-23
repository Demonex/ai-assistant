import {Module}             from '@nestjs/common';
import {ProviderService}    from '../services/Provider.js';
import {ProviderController} from '../controllers/Provider.js';
import {GoogleStrategy}     from '../plugins/express/google.stratagies.js';
import {FacebookStrategy}   from '../plugins/express/facebook.stratagies.js';
import {PassportModule}     from '@nestjs/passport';
import {TypegooseModule}    from 'nestjs-typegoose';
import {UserEntity}         from '../entities/User/index.js';

@Module({
  imports:[
    PassportModule.register({session:true}),
    TypegooseModule.forFeature([UserEntity])
  ],
  controllers:[ProviderController],
  providers:[ProviderService,GoogleStrategy,FacebookStrategy],
  exports:[ProviderService]
})
export class ProviderModule{
}
