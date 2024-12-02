import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  IsEnum, IsBoolean, Matches,
  IsNotEmpty,
  MinLength
} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {USER_LANGUAGES} from '../entities/enums.js';

export class UpdateProfileDto {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  readonly email?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Логин не может быть пустым' })
  @MaxLength(256)
  @ApiPropertyOptional()
  readonly name?: string;
  @IsOptional()
  @IsString()
  @MaxLength(256)
  @ApiPropertyOptional()
  @Matches(/^[a-zA-Z0-9_.-]{2,20}$/)
  readonly username?: string;
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(256)
  @ApiPropertyOptional()
  readonly password?: string;
  @IsOptional()
  @IsEnum(USER_LANGUAGES)
  @ApiPropertyOptional({
    enum: USER_LANGUAGES
  })
  readonly language?: USER_LANGUAGES.EN | USER_LANGUAGES.RU;
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(120)
  @MaxLength(5, {
    each: true
  })
  @IsString({each: true})
  @ApiPropertyOptional({
    type: 'string',
    isArray: true,
    default: []
  })
  readonly providersSafe?: string[];
}

export class UpdateProfileAvatarDto {
  @IsOptional()
  @ApiPropertyOptional({
    type: 'file',
    format: 'binary'
  })
  readonly file?: any;
}
export class UpdateProfileSubscriptionDto {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  @ApiPropertyOptional()
  readonly artist?: string;
}