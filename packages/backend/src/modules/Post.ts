import {Module} from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose';
import PostEntity from '../entities/Post';
import {PostController} from '../controllers/Post';
import {PostService} from '../services/Post';
import PostMediaEntity from '../entities/Post/Media';

@Module({
  imports: [TypegooseModule.forFeature([
    PostEntity,
    PostMediaEntity,
  ])],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController]
})
export class PostModule {
}
