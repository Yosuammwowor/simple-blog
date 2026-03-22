import fs from "fs";
import { join } from "path";

const filepath = join(import.meta.dirname, "/posts.json");

async function getUsers() {
  if (fs.existsSync(filepath)) {
    const data = await fs.promises.readFile(filepath);
    return {
      status: "success",
      data: JSON.parse(data.toString()),
    };
  } else {
    return {
      status: "fail",
      message: "file didnt exists",
    };
  }
}

export { getUsers };
