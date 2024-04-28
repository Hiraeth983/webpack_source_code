import { Config } from "../types";

export function Loader(source: string, config: Config) {
  const module = config.rules.module;
  module.forEach((item) => {
    if (Array.isArray(item.use)) {
      item.use.reverse().forEach((fn) => {
        source = fn(source);
      });
    } else {
      source = item.use(source);
    }
  })
  return source;
}