import express from "express";
import next from "next";
import cookieParser from "cookie-parser";
import cors from "cors";

const getServerSideURL = () => {
	let url = process.env.NEXT_PUBLIC_SERVER_URL;

	if (!url) {
		url = `http://localhost:${process.env.PORT || 2055}`;
	}

	return url;
};

const port = process.env.PORT || 2055;
const app = next({ dev: process.env.NODE_ENV === "development" });
const handle = app.getRequestHandler();

await app.prepare();

const server = express();

server.use(cookieParser());

server.use(
	cors({
		credentials: true,
		preflightContinue: true,
		origin: [getServerSideURL(), process.env.NEXT_PUBLIC_FRONTEND_URL].filter(
			Boolean,
		),
	}),
);

server.all("*", (req, res) => {
	return handle(req, res);
});

server.listen(port, (err) => {
	if (err) throw err;
	console.log(`Payload: ready on http://localhost:${port}`);
});
