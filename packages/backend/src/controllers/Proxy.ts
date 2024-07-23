import {
  Controller,
  Get,
  HttpCode,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ProxyService} from "../services/Proxy.js";

@Controller('/api/rest/proxy')
export class ProxyController {
  constructor(
    public service: ProxyService
  ) {
  }

  @ApiTags('web')
  @Get('*')
  @HttpCode(200)
  async signIn(
  ) {
    return this.service.get();
  }
}
