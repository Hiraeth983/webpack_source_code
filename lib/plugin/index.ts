import { Config } from "../types";

import { hooks } from "./hooks";

export const initPlugin = (config: Config) => {
  config.plugins.forEach((plugin) => {
    plugin.apply(hooks);
  });
  // 调用 afterPlugins
  hooks.afterPlugins.call(this);
}