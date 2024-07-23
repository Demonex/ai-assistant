import {Body, Controller, Get, HttpCode, Post, Request} from '@nestjs/common';
import {ApiBody, ApiTags} from '@nestjs/swagger';
import {UserLanguage} from '../decorators/user.js';
import {lookup} from 'geoip-lite';
import {PostLogDto} from '../dto/Log.js';
import {get} from 'lodash-es';

@ApiTags('appScreens')
@Controller('/api/rest/appScreens')
export class AppScreensController {
  constructor() {
  }

  @Get()
  @HttpCode(200)
  async settings(
    @UserLanguage() language,
    @Request() req
  ) {
    const {items} = await req.payload.findGlobal({
      slug: 'appScreens',
      locale: language,
      user: {
        roles: ['admin']
      }
    });
    return {
      items
    };
  }

  @Post()
  @HttpCode(200)
  @ApiBody({
    type: PostLogDto
  })
  async appScreens(
    @UserLanguage() language,
    @Request() req,
    @Body() body: PostLogDto
  ) {
    console.log('req.headers',req.headers)
    const ip = String(req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',').pop();
    const isBangladesh = get(lookup(ip), 'country') === 'BD';
    const {items} = await req.payload.findGlobal({
      slug: 'appScreens',
      locale: language,
      user: {
        roles: ['admin']
      }
    });
    if(!isBangladesh) {
      items.shift();
    }
    return {
      items
    };
  }
}
