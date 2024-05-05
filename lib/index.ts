import config from "../webpack.config";

import { createGraph, build } from "./build";
import { hooks } from "./plugin/hooks";

import { initPlugin } from "./plugin/index";

// 先订阅再触发
initPlugin(config);
hooks.initialize.call(this);

const graph = createGraph(config);

build(graph, config);

hooks.done.callAsync(this, (error) => {
  if (error) {
    console.log(error);
  }
});