import { Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("/api")
export class AuthController {
	@Post("/rest/auth/email/sign-in")
	@HttpCode(200)
	signIn() {
		throw new Error("error10");
	}
}
