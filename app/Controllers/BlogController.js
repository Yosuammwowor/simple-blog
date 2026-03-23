import { getUsers } from "../Models/Blogs.js";

async function requestHandler(req, res) {
  res.setHeader("content-type", "application/json");

  if (req.url !== "/posts") {
    res.statusCode = 404;
    return res.end(JSON.stringify({ status: "fail", message: "Not Found" }));
  }

  const data = await getUsers();

  if (data.status === "fail") {
    res.statusCode = 501;
    return res.end(JSON.stringify(data));
  }

  res.statusCode = data.data.length === 0 ? 204 : 200;
  return res.end(JSON.stringify(data));
}

export { requestHandler };
