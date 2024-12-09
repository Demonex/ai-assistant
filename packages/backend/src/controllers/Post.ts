import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { UserLanguage } from "@repo/backend/decorators/user.js";
import { ApiTags } from "@nestjs/swagger";
import { PostService } from "@repo/backend/services/Post.js";

@ApiTags("post")
@Controller("/api/rest/post")
export class PostController {
  constructor(
    public service: PostService,
  ) {
  }

  @Get()
  @HttpCode(200)
  async get(
    @UserLanguage() lang: string,
  ) {
    return this.service.getAll("ru");
  }

  @Get(":id")
  @HttpCode(200)
  async getPost(
    @UserLanguage() lang: string,
    @Param("id") id?: string,
  ) {
    return this.service.getPost(id, "ru");
  }
}
