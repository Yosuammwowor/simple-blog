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
    res.statusCode = 200;
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });

    req.on("end", async () => {
      data = Buffer.concat(data).toString();

      const blogResponse = await insertUser(JSON.parse(data));
      return res.end(JSON.stringify(blogResponse));
    });
  }
}

export { requestHandler };
