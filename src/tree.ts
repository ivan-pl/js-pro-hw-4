import { readdir } from "node:fs/promises";
import { join } from "node:path";

interface FileTree {
  files: string[];
  dirs: string[];
}

export default async function getFileTree(path: string): Promise<FileTree> {
  const fileTree: FileTree = { dirs: [], files: [] };

  const addFilesToTree = async (relPath: string): Promise<void> => {
    const curPath = join(path, relPath);
    const files = await readdir(curPath, { withFileTypes: true });
    const dirsList: string[] = [];
    for (const file of files) {
      const curRelPath = join(relPath, file.name);
      if (file.isDirectory()) {
        fileTree.dirs.push(curRelPath.replace(/\\/g, "/"));
        dirsList.push(curRelPath);
        continue;
      }
      fileTree.files.push(curRelPath.replace(/\\/g, "/"));
    }
    await Promise.all(dirsList.map((curRelPath) => addFilesToTree(curRelPath)));
  };

  await addFilesToTree("");

  return fileTree;
}
