import {Module}              from '@nestjs/common';
import {TypegooseModule}     from 'nestjs-typegoose';
import {AuthService}         from '../services/Auth.js';
import {UserEntities, UserEntity} from '../entities/User/index.js';
import {AuthController} from '../controllers/Auth.js';
import {SmtpService}         from '../services/Smtp.js';
import { CrmService } from '../services/crm.service';
import { MailerModule } from '~/mailer/mailer.module.js';

@Module({
  imports:[TypegooseModule.forFeature([...UserEntities]), MailerModule],
  providers:[AuthService,SmtpService, CrmService],
  exports:[AuthService],
  controllers:[AuthController]
})
export class AuthModule{
}
