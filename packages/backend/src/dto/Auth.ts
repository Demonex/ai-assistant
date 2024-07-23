import {IsBoolean, IsEmail, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class AuthSignInDto {
  @IsEmail()
  @ApiProperty({required: true})
  readonly email!: string;
  @IsString()
  @ApiProperty({required: true})
  readonly password!: string;
}

export class PayloadSignInDto {
  @IsEmail()
  @MaxLength(256)
  @ApiProperty({required: true})
  readonly email!: string;
  @IsString()
  @ApiProperty({required: true})
  readonly password!: string;
}

export class AuthSignUpDto {
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
  /*@IsString()
  @MinLength(3)
  @MaxLength(24)
  @Matches(/^(?=.{3,24}$)[a-zA-Z0-9_.-]+$/)
  @ApiProperty({required:true})
  readonly username!: string;*/
  @IsEmail()
  @ApiProperty({required: true})
  readonly email!: string;
  @IsString()
  @MinLength(6)
  @ApiProperty({required: true})
  readonly password!: string;
  @IsOptional()
  @IsString()
  @MaxLength(256)
  @ApiPropertyOptional()
  readonly phone?: string;
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  readonly consent?: boolean;
}

export class AuthRecoverDto {
  @IsString()
  @MaxLength(256)
  @ApiProperty({required: true})
  readonly login?: string;
}
