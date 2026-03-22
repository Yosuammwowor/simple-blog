import http from "http";
import { requestHandler } from "./app/Controllers/BlogController.js";

const server = http.createServer((req, res) => {
  requestHandler(req, res);
});

server.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
