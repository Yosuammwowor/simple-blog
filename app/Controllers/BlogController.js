import { getUsers } from "../Models/Blogs.js";

async function requestHandler(req, res) {
  res.setHeader("content-type", "application/json");

  if (req.url !== "/posts") {
    res.statusCode = "404";
    return res.end(JSON.stringify({ status: "fail", message: "Not Found" }));
  }

  const data = await getUsers();

  res.statusCode = "200";
  return res.end(JSON.stringify(data));
}

export { requestHandler };
