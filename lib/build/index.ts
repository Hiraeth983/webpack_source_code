import fs from "node:fs";
import path from "node:path";

import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { transformFromAstSync } from "@babel/core";

import ejs from "ejs";

import { Graph, Config } from "../types";

import { Loader } from "../loader";

let globalId = 0;

function createAssets(filePath: string, config: Config) {
  const content = fs.readFileSync(
    path.resolve(process.cwd(), filePath),
    "utf-8"
  );
  // sourceType: "module" is required for ES module syntax
  const ast = parse(content, { sourceType: "module" });
  const deps: string[] = [];
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      deps.push(node.source.value);
    },
  });
  // 获取文件代码 esm --> cjs
  const source = transformFromAstSync(ast, undefined, {
    presets: ["@babel/preset-env"]
  });

  if (source?.code) {
    source.code = Loader(source.code, config);
  }

  return {
    filePath,
    deps,
    code: source?.code as string,
    id: globalId++,
    mapping: {} as Record<string, number>
  };
}
// 数据结构 使用图的方式来表示
export function createGraph(config: Config) {
  const graph = createAssets(config.entry, config);
  const queue = [graph];  
  for (let assets of queue) {
    assets.deps.forEach((dep: string) => {
      const child = createAssets(dep, config);
      assets.mapping[dep] = child.id;
      queue.push(child);
    });
  }
  return queue;
}

export function build(graph: Graph[], config: Config) {
  const template = fs.readFileSync(path.resolve(process.cwd(), "lib/template/bundle.ejs"), "utf-8");
  const content = ejs.render(template, { data: graph, entry: "0" });
  const filename = config.output.filename;
  const outputDir = config.output.path;
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.resolve(outputDir, filename), content);
}
