export interface Graph {
  filePath: string;
  deps: string[];
  code?: string;
  id: number;
  mapping: Record<string, number>;
}

export interface Config {
  entry: string;
  output: {
    filename: string;
    path: string;
  },
  rules: {
    module: {
      test: RegExp;
      use: ((...args: any[]) => string) | Array<Function>;
    }[]
  }
}