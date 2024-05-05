!(function (modules) {
  function require(path) {
    const [ fn, mapping ] = modules[path];
    const module = { exports: {} };
    function localRequire(relativePath) {
      return require(mapping[relativePath]);
    }
    fn(localRequire, module, module.exports);
    return module.exports;
  }

  require("0");
})({
  
    "0": [function (require, module, exports) {
      "use strict";

var _app = _interopRequireDefault(require("./app.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var a = 1;
(0, _app["default"])(a, 2); // 3console.log('jsLoader')
    }, {"./app.js":1}],
  
    "1": [function (require, module, exports) {
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var a = 1;
var add = function add(a, b) {
  console.log('REMOVED');
  return a + b;
};
var _default = exports["default"] = add;console.log('jsLoader')
    }, {}],
  
});