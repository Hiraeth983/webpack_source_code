import { SyncHook, AsyncSeriesHook } from "tapable";

// tapable 实际上是发布订阅模式加强版
// 1. 同步钩子
type SyncHookType = [string, string];
const hook = new SyncHook<SyncHookType>(["arg1", "arg2"]); // 接收参数，默认接收一个泛型为unkonwn
// 监听（委任）
hook.tap("hook1", (arg1, arag2) => {
  console.log("hook1", arg1, arag2);
});
hook.tap("hook2", (arg1, arag2) => {
  console.log("hook2", arg1, arag2);
});
// 触发所有 tapped 了的回调函数
hook.call("webpack", "tapable");

// 2. 异步钩子 串行
const asyncHook = new AsyncSeriesHook<[string, string]>(["arg1", "arg2"]);
// 监听（委任）
asyncHook.tapPromise("hook3", (arg1, arag2) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("hook3", arg1, arag2);
      resolve();
    }, 1000);
  });
});
asyncHook.tapPromise("hook4", (arg1, arag2) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("hook4", arg1, arag2);
      resolve();
    }, 1000);
  });
});
asyncHook.tapAsync("hook5", (arg1, arag2, callback) => {
  setTimeout(() => {
    console.log("hook5", arg1, arag2);
    callback(); // 必须调用
  }, 1000);
});
// 触发所有 tapped 的异步回调函数
asyncHook.callAsync("webpack", "tapableAsync", () => {
  console.log("done");
});
