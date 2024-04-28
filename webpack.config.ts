import path from "node:path";

function jsLoader(source: string) {
  console.log("jsLoader");
  source = source.replace(/console\.log\((.*)\)/g, "console.log('REMOVED')");
  source += "console.log('jsLoader')";
  return source;
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
};