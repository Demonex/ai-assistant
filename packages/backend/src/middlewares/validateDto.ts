import { HttpException, HttpStatus } from "@nestjs/common";
import { validate, ValidationError } from "class-validator";
import { type ClassConstructor } from "class-transformer";

export const validateDto = async (
	dto: ClassConstructor<object>,
	data: Record<string, unknown>,
	request: unknown,
): Promise<void> => {
	const errors: ValidationError[] = await validate(
		Object.assign(new dto(), data),
		{
			validationError: {
				target: false,
				value: false,
			},
		},
	);

	if (errors.length) {
		throw new HttpException(
			{
				statusCode: HttpStatus.BAD_REQUEST,
				message: errors.reduce((prev, error) => {
					return [...prev, ...Object.values(error.constraints)];
				}, []),
			},
			HttpStatus.BAD_REQUEST,
		);
	}
};
