import { ApiProperty } from "@nestjs/swagger";
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from "class-validator";

export class AuthSignInDto {
	@IsEmail()
	@ApiProperty({ required: true })
	readonly email!: string;
	@IsString()
	@ApiProperty({ required: true })
	readonly password!: string;
}

export class PayloadSignInDto {
	@IsEmail()
	@MaxLength(256)
	@ApiProperty({ required: true })
	readonly email!: string;
	@IsString()
	@ApiProperty({ required: true })
	readonly password!: string;
}

export class AuthSignUpDto {
	@IsString()
	// @MinLength(3)
	// @MaxLength(50)
	// @Matches(/^(?=.{3,24}$)[a-zA-Z0-9_.-]+$/)
	@ApiProperty({ required: true })
	readonly name!: string;
	@IsEmail()
	@ApiProperty({ required: true })
	readonly email!: string;
	@IsString()
	@MinLength(6)
	@ApiProperty({ required: true })
	readonly password!: string;
}

export class AuthRecoverDto {
	@IsString()
	@MaxLength(256)
	@ApiProperty({ required: true })
	readonly login?: string;
}

export class RequestPasswordResetDto {
	@ApiProperty({
		description: "Email of the user requesting a password reset",
		example: "user@example.com",
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;
}

export class ResetPasswordDto {
	@ApiProperty({
		description: "Token received in the password reset email",
		example: "abcd1234token",
	})
	@IsNotEmpty()
	@IsString()
	token: string;

	@ApiProperty({
		description: "Email of the user resetting the password",
		example: "user@example.com",
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		description: "New password for the user",
		example: "newsecurepassword",
		minLength: 8,
	})
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	newPassword: string;
}
