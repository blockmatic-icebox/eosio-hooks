'use strict';
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = require('react');
var use_transit_state_1 = __importDefault(require('./use-transit-state'));
var transit_context_1 = require('./transit-context');
function useTransit() {
  var state = use_transit_state_1.default();
  var context = react_1.useContext(transit_context_1.TransitContext);
  if (context === undefined) {
    throw new Error('You must wrap your application with <TransitProvider /> in order to useTransit().');
  }
  return __assign({ transitState: state }, context);
}
exports.default = useTransit;
