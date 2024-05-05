import path from "node:path";
import fs from "node:fs";

import { Hooks } from "./lib/types";

function jsLoader(source: string) {
  // console.log("jsLoader");
  source = source.replace(/console\.log\((.*)\)/g, "console.log('REMOVED')");
  source += "console.log('jsLoader')";
  return source;
}

// Webpack Plugin 都是类
// 类里面必须有 apply 方法
// 基于 tapable 实现
class HtmlWebpackPlugin {
  options: { template: string };
  newTemplate: string;

  constructor(options: { template: string }) {
    this.options = options;
    this.newTemplate = "";
  }
  apply(hooks: Hooks) {
    hooks.afterPlugins.tap("afterPlugins", () => {
      console.log("afterPlugins");
    });
    hooks.initialize.tap("initialize", () => {
      console.log("initialize");
      const template = fs.readFileSync(this.options.template, "utf-8");
      this.newTemplate = template.replace(
        /<\/head>/,
        '<script src="./bundle.js"></script></head>'
      );
    });
    hooks.emit.tapPromise("emit", () => {
      return new Promise((resolve, reject) => {
        console.log("emit");
        resolve();
      });
    });
    hooks.afterEmit.tapPromise("afterEmit", () => {
      return new Promise((resolve, reject) => {
        console.log("afterEmit");
        resolve();
      });
    });
    hooks.done.tapPromise("done", () => {
      return new Promise((resolve, reject) => {
        console.log("done");
        fs.writeFileSync(path.join(process.cwd(), "dist", "index.html"), this.newTemplate);
        resolve();
      });
    });
  }
}

export default {
  entry: "./main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(process.cwd(), "dist"),
  },
  rules: {
    module: [
      {
        test: /\.js$/,
        use: jsLoader,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
  ]
};