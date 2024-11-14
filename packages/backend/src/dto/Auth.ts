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
  @IsString()
  // @MinLength(3)
  // @MaxLength(50)
  // @Matches(/^(?=.{3,24}$)[a-zA-Z0-9_.-]+$/)
  @ApiProperty({required:true})
  readonly name!: string;
  @IsEmail()
  @ApiProperty({required: true})
  readonly email!: string;
  @IsString()
  @MinLength(6)
  @ApiProperty({required: true})
  readonly password!: string;
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
