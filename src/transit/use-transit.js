"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const use_transit_state_1 = __importDefault(require("./use-transit-state"));
const transit_context_1 = require("./transit-context");
function useTransit() {
    const state = use_transit_state_1.default();
    const context = react_1.useContext(transit_context_1.TransitContext);
    if (context === undefined) {
        throw new Error('You must wrap your application with <TransitProvider /> in order to useTransit().');
    }
    return Object.assign({ state }, context);
}
exports.useTransit = useTransit;
//# sourceMappingURL=use-transit.js.map