import { AsyncSeriesHook, SyncHook } from "tapable";

// 自行根据需求定义钩子
// 并在合适的时机触发
export const hooks = {
  afterPlugins: new SyncHook(),
  initialize: new SyncHook(),
  emit: new AsyncSeriesHook(["emit"]),
  afterEmit: new AsyncSeriesHook(["afterEmit"]),
  done: new AsyncSeriesHook(["done"]),
};