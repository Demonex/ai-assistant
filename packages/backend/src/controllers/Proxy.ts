import {
  Controller,
  Get,
  HttpCode,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ProxyService} from "../services/Proxy.js";

@ApiTags('proxy')
@Controller('/api/rest/proxy')
export class ProxyController {
  constructor(
    public service: ProxyService
  ) {
  }

  @Get('*')
  @HttpCode(200)
  async signIn(
  ) {
    return this.service.get();
  }
}
