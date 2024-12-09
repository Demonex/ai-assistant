import express from "express";
import next from "next";

const port = process.env.PORT || 2055;
const app = next({ dev: false });
const handle = app.getRequestHandler();

await app.prepare();

const server = express();

server.all("*", (req, res) => {
  return handle(req, res);
});


server.listen(port, (err) => {
  if (err) throw err;
  console.log(`Payload: ready on http://localhost:${port}`);
});
