"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var dfuse_config_context_1 = require("./dfuse-config.context");
function DfuseProvider(_a) {
    var apiKey = _a.apiKey, network = _a.network, children = _a.children;
    return react_1.default.createElement(dfuse_config_context_1.DfuseConfigContext.Provider, { value: { apiKey: apiKey, network: network } }, children);
}
exports.default = DfuseProvider;
