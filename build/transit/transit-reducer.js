"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var initialState = {
    connecting: false,
    wallet: null,
    error: null,
};
var transitReducer = function (state, action) {
    switch (action.type) {
        case 'CONNECT_WALLET_START':
            return __assign({}, state, { connecting: action.payload.provider, error: false });
        case 'CONNECT_WALLET':
            return __assign({}, state, { connecting: null, wallet: action.payload.wallet, error: false });
        case 'DISCONNECT_WALLET':
            return {
                connecting: null,
                wallet: null,
                error: false,
            };
        case 'CONNECT_ERROR':
            return {
                connecting: null,
                wallet: null,
                error: true,
            };
        default:
            throw new Error("Invalid action: " + action.type);
    }
};
function useTransitReducer() {
    return react_1.useReducer(transitReducer, initialState);
}
exports.default = useTransitReducer;
