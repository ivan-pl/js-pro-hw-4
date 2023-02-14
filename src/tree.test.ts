import getFileTree from "./tree";
import { resolve } from "node:path";

describe("getFileTree()", () => {
  it("returns structure of example_folder", async () => {
    expect(await getFileTree(resolve("example_folder"))).toEqual({
      files: [
        "foo/f1.txt",
        "foo/f2.txt",
        "foo/bar/bar1.txt",
        "foo/bar/bar2.txt",
        "foo/bar/baz/baz1.txt",
      ],
      dirs: ["foo", "foo/bar", "foo/bar/baz"],
    });
  });
});
