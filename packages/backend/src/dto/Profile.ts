import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  IsEnum, IsBoolean
} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {Languages} from '../entities/User/index.js';

export class UpdateProfileDto {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  readonly email?: string;
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean
  })
  readonly hasFinishedQuiz?: boolean;
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @MaxLength(256)
  readonly firstName?: string;
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @MaxLength(256)
  readonly lastName?: string;
  @IsOptional()
  @IsEnum(Languages)
  @ApiPropertyOptional({
    enum: Languages
  })
  readonly language?: Languages.EN | Languages.RU;
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
