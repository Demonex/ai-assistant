import {Body,Controller,Get,HttpCode,HttpException,HttpStatus,Param,Post,Redirect,Request} from '@nestjs/common';
/*import {AuthRecoverDto,AuthSignInDto,AuthSignUpDto,PayloadSignInDto}                       from '../dto/Auth';
import {AuthService}                                                                       from '../services/Auth';
import {Authorized,Unauthorized}                                                           from '../decorators/auth';
import {UserId}                                                                            from '../decorators/user';
import payload                                                                             from '@stigma-io/payload';
import jwt                                                                                 from 'jsonwebtoken';*/
import {ApiExcludeEndpoint,ApiResponse,ApiTags}                                            from '@nestjs/swagger';
/*import {RedirectResponse}                                                                  from '@nestjs/core/router/router-response-controller';
import {validateDto}                                                                       from '../middlewares/validateDto';*/

@ApiTags('auth')
@Controller('/api/rest')
export class PayloadController{
  constructor(
  ){
  }
  @ApiExcludeEndpoint(process.env.ENV!=='development')
  @Get('user/init')
  @HttpCode(200)
  async init(
  ){
    return {
      initialized:true
    };
  }

}
