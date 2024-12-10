import type { Session } from "express-session";

export class ExpressRequest extends Request {
	session: Session;
}
