"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var transit_context_1 = require("./transit-context");
function useTransitState() {
    var context = react_1.useContext(transit_context_1.TransitStateContext);
    if (context === undefined) {
        throw new Error('You must wrap your application with <TransitProvider /> in order to useTransitState().');
    }
    return context;
}
exports.default = useTransitState;
