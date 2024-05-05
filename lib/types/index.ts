import type { SyncHook, AsyncSeriesHook } from "tapable";

export interface Graph {
  filePath: string;
  deps: string[];
  code?: string;
  id: number;
  mapping: Record<string, number>;
}

export interface Hooks<T = unknown> {
  afterPlugins: SyncHook<T>;
  initialize: SyncHook<T>;
  emit: AsyncSeriesHook<T>;
  afterEmit: AsyncSeriesHook<T>;
  done: AsyncSeriesHook<T>;
}

// 数组 每个数组项是一个类，类必须实现 apply 方法
interface Plugin {
  apply: (compiler: any) => void;
}

export interface Config {
  entry: string;
  output: {
    filename: string;
    path: string;
  };
  rules: {
    module: {
      test: RegExp;
      use: ((...args: any[]) => string) | Array<Function>;
    }[];
  };
  plugins: Array<Plugin>;
}