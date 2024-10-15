import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  IsEnum, IsBoolean, Matches, IsMongoId
} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {USER_LANGUAGES} from '../entities/enums.js';
import {Types} from 'mongoose';

export class SubscriptionPurchaseDto {
  @IsMongoId()
  @ApiProperty({type: String})
  readonly plan!: Types.ObjectId;
  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({type: String})
  readonly subscription?: Types.ObjectId;
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly artist?: string;
}

export class SubscriptionUpdateDto {
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  readonly renew?: boolean;
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  readonly archived?: boolean;
}

export class SubscriptionPurchaseCallbackDto {
  @IsString()
  @ApiProperty()
  readonly OutSum!: string;
  @IsString()
  @ApiProperty()
  readonly InvId!: string;
  @IsString()
  @ApiProperty()
  readonly SignatureValue!: string;
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({default: true})
  readonly skip?: boolean;
}
