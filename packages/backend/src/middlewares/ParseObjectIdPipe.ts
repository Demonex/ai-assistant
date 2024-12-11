import {
	type PipeTransform,
	Injectable,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { ObjectId } from "mongodb";
import { HttpStatusMessages } from "@repo/backend/messages/http.js";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
	public transform(value: string): ObjectId {
		try {
			return ObjectId.createFromHexString(value);
		} catch (error) {
			throw new HttpException(
				{
					statusCode: HttpStatus.BAD_REQUEST,
					messages: [
						{
							messages: [HttpStatusMessages.OBJECT_ID_EXPECTED],
						},
					],
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
