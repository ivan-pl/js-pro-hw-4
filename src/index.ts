import { existsSync } from "node:fs";
import getFileTree from "./tree";

const path = process.argv[2];
if (!path) {
  console.log("Path is required");
  process.exit(1);
}

if (!existsSync(path)) {
  console.log("Path doesn't exist");
  process.exit(1);
}

getFileTree(path).then(console.log);
