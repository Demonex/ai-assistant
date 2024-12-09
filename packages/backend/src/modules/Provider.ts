import {Module}             from '@nestjs/common';
import {ProviderService}    from '@repo/backend/services/Provider.js';
import {ProviderController} from '@repo/backend/controllers/Provider.js';
import {GoogleStrategy}     from '@repo/backend/plugins/express/google.stratagies.js';
import {FacebookStrategy}   from '@repo/backend/plugins/express/facebook.stratagies.js';
import {PassportModule}     from '@nestjs/passport';
import {TypegooseModule}    from 'nestjs-typegoose';
import {UserEntity}         from '@repo/backend/entities/User/index.js';

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
