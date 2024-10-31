import {Controller, Get, HttpCode, Param} from '@nestjs/common';
import {UserLanguage} from '../decorators/user.js';
import {ApiTags} from '@nestjs/swagger';
import {PostService} from '../services/Post';

@ApiTags('post')
@Controller('/api/rest/post')
export class PostController {
  constructor(
    public service: PostService
  ) {
  }

  @Get()
  @HttpCode(200)
  async get(
    @UserLanguage() lang: string
  ) {
    return this.service.getAll('ru');
  }

  @Get(':id')
  @HttpCode(200)
  async getPost(
    @UserLanguage() lang: string,
    @Param('id') id?: string
  ) {
    return this.service.getPost(id, 'ru');
  }
}
