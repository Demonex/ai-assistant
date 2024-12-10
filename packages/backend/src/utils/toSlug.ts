import slugify from "slugify";
import { v4 as uuid } from "uuid";

// @ts-ignore
const toSlug = (str: string) =>
	slugify(str || uuid(), {
		replacement: "_",
		lower: true,
		strict: true,
	});
export default toSlug;
