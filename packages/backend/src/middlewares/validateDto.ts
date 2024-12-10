import { validate } from "class-validator";
import { HttpException, HttpStatus } from "@nestjs/common";

export const validateDto = async (dto: any, data: any, request: any) => {
	const errors = await validate(Object.assign(new dto(), data), {
		validationError: {
			target: false,
			value: false,
		},
	});
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
