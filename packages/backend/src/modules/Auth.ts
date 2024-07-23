import {Module}              from '@nestjs/common';
import {TypegooseModule}     from 'nestjs-typegoose';
import {AuthService}         from '../services/Auth.js';
import {UserEntity}          from '../entities/User/index.js';
import {AuthController} from '../controllers/Auth.js';
import {SmtpService}         from '../services/Smtp.js';

@Module({
  imports:[TypegooseModule.forFeature([UserEntity])],
  providers:[AuthService,SmtpService],
  exports:[AuthService],
  controllers:[AuthController]
})
export class AuthModule{
}
