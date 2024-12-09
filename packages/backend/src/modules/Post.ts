import {Module} from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose';
import PostEntity from '@repo/backend/entities/Post';
import {PostController} from '@repo/backend/controllers/Post';
import {PostService} from '@repo/backend/services/Post';
import PostMediaEntity from '@repo/backend/entities/Post/Media';

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
