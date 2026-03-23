import fs from "fs";
import { join } from "path";

const filepath = join(import.meta.dirname, "/posts.json");

async function getUsers() {
  if (!fs.existsSync(filepath)) {
    return { status: "fail", message: "file didnt exist" };
  }

  const data = await fs.promises.readFile(filepath);

  return {
    status: "success",
    data: JSON.parse(data.toString()),
  };
}

async function insertUser(data) {
  if (!fs.existsSync(filepath)) {
    return { status: "fail", message: "file didnt exist" };
  }

  const datas = (await getUsers()).data;
  datas.push(data);

  await fs.promises.writeFile(filepath, JSON.stringify(datas));

  return {
    status: "success",
    message: "data successfully added",
  };
}

export { getUsers, insertUser };
