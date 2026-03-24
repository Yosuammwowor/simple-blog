import { getUsers, insertUser } from "../Models/Blogs.js";
import { nanoid } from "nanoid";

async function requestHandler(req, res) {
  res.setHeader("content-type", "application/json");

  if (req.url !== "/posts") {
    res.statusCode = 404;
    return res.end(JSON.stringify({ status: "fail", message: "Not Found" }));
  }

  if (req.method === "GET") {
    const data = await getUsers();

    if (data.status === "fail") {
      res.statusCode = 501;
      return res.end(JSON.stringify(data));
    }

    res.statusCode = data.data.length === 0 ? 204 : 200;
    return res.end(JSON.stringify(data));
  }

  if (req.method === "POST") {
    let data = [];

    req.on("data", (chunk) => {
      data.push(chunk);
    });

    req.on("end", async () => {
      data = Buffer.concat(data).toString();
      data = JSON.parse(data);
      res.statusCode = 400;

      if (data === null || typeof data !== "object") {
        res.statusCode = 400;
        return res.end(
          JSON.stringify({
            status: "fail",
            message: "Invalid not JSON format",
          }),
        );
      }

      if (Object.keys(data).length === 0) {
        return res.end(
          JSON.stringify({
            status: "fail",
            message: "Invalid empty body",
          }),
        );
      }

      if (Object.keys(data).length > 2) {
        res.statusCode = 400;
        return res.end(
          JSON.stringify({
            status: "fail",
            message: "Invalid too many property",
          }),
        );
      }

      if (
        data.title === "" ||
        data.description === "" ||
        !("title" in data) ||
        !("description" in data)
      ) {
        res.statusCode = 400;
        return res.end(
          JSON.stringify({
            status: "fail",
            message: "Invalid title or description",
          }),
        );
      }

      res.statusCode = 200;
      data = {
        id: nanoid(),
        title: data.title,
        description: data.description,
      };

      const blogResponse = await insertUser(data);

      return res.end(JSON.stringify(blogResponse));
    });
  }
}

export { requestHandler };
