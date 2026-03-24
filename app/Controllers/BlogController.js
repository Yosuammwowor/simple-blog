import { getUsers, insertUser } from "../Models/Blogs.js";

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

      if (Object.keys(data).length > 3) {
        res.statusCode = 400;
        return res.end(
          JSON.stringify({
            status: "fail",
            message: "Invalid too many property",
          }),
        );
      }

      if (
        data.id === "" ||
        data.title === "" ||
        data.description === "" ||
        !("id" in data) ||
        !("title" in data) ||
        !("description" in data)
      ) {
        res.statusCode = 400;
        return res.end(
          JSON.stringify({
            status: "fail",
            message: "Invalid id, title, or description",
          }),
        );
      }

      res.statusCode = 200;
      const blogResponse = await insertUser(data);

      return res.end(JSON.stringify(blogResponse));
    });
  }
}

export { requestHandler };
