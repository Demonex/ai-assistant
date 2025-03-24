import express from "express";
import next from "next";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 2055;
const app = next({ dev: process.env.NODE_ENV === "development" });
const handle = app.getRequestHandler();

await app.prepare();

const server = express();

server.use(cookieParser());

server.all("*", (req, res) => {
	return handle(req, res);
});

server.listen(port, (err) => {
	if (err) throw err;
	console.log(`Payload: ready on http://localhost:${port}`);
});
