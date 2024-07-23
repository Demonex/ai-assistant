import {Module} from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose';
import {UserService} from '../services/User.js';
import {ProfileController} from '../controllers/Profile.js';
import {PayloadController} from '../controllers/Payload.js';
import {UserEntities} from '../entities/User';

@Module({
  imports: [TypegooseModule.forFeature([...UserEntities])],
  providers: [UserService],
  exports: [UserService],
  controllers: [ProfileController, PayloadController]
})
export class UserModule {
}
