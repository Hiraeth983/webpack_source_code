import config from "../webpack.config";

import { createGraph, build } from "./build";

const graph = createGraph(config);

build(graph, config);
