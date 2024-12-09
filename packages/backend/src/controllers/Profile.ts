import { Body, Controller, Delete, Get, HttpCode, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import type { Types } from "mongoose";
import { UserService } from "@repo/backend/services/User.js";
import { UpdateProfileDto } from "@repo/backend/dto/Profile.js";
import { Authorized } from "@repo/backend/decorators/auth.js";
import { UserEmail, UserId } from "@repo/backend/decorators/user.js";
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("profile")
@Controller("/api/rest/profile")
export class ProfileController {
  constructor(
    public service: UserService,
  ) {
  }

  @ApiBearerAuth("bearer-sid")
  @ApiOperation({ summary: "get profile" })
  @Get()
  @HttpCode(200)
  async meAdmin(
    @UserId() id?: Types.ObjectId,
    @UserEmail() email?: string,
  ) {
    return this.service.me(id, email);
  }

  @ApiBearerAuth("bearer-sid")
  @ApiOperation({ summary: "update profile" })
  @Authorized()
  @Put()
  async update(
    @UserId() id: Types.ObjectId,
    @Body() args: UpdateProfileDto) {
    return this.service.findByIdAndUpdate(id, args);
  }

  @ApiBearerAuth("bearer-sid")
  @ApiOperation({ summary: "avatar update in profile" })
  @Authorized()
  @Post("avatar/update")
  @UseInterceptors(
    FileInterceptor("file" /*{
      limits: {
        fieldNameSize: 100,
        fieldSize: 1000000,
        fields: 20,
        fileSize: 5000000,
        files: 1,
        headerPairs: 2000
      }
    }*/),
  )
  @ApiConsumes("multipart/form-data")
  async updateAvatar(
    @UserId() id: Types.ObjectId,
    @UploadedFile("file") file) {
    // console.log('avatar update', get(request, 'headers.authorization'), get(request, 'session.id'), id);
    return this.service.findByIdAndUpdateAvatar(id, { file });
  }

  @ApiBearerAuth("bearer-sid")
  @ApiOperation({ summary: "delete user profile" })
  @Authorized()
  @Delete("delete")
  async profileDelete(
    @UserId() userId: Types.ObjectId) {
    return this.service.findByIdAndDelete(userId);
  }
}
