"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const initialState = {
    connecting: false,
    wallet: null,
    error: null,
};
const transitReducer = (state, action) => {
    switch (action.type) {
        case 'CONNECT_WALLET_START':
            return Object.assign({}, state, { connecting: action.payload.provider, error: false });
        case 'CONNECT_WALLET':
            return Object.assign({}, state, { connecting: null, wallet: action.payload.wallet, error: false });
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
            throw new Error(`Invalid action: ${action.type}`);
    }
};
function useTransitReducer() {
    return react_1.useReducer(transitReducer, initialState);
}
exports.default = useTransitReducer;
//# sourceMappingURL=transit-reducer.js.map