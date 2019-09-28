"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var transit_context_1 = require("./transit-context");
function useTransitDispatch() {
    var dispatch = react_1.useContext(transit_context_1.TransitDispatchContext);
    if (dispatch === undefined) {
        throw new Error('You must wrap your application with <TransitProvider /> in order to useTransitDispatch().');
    }
    return dispatch;
}
exports.default = useTransitDispatch;
