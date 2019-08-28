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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var eos_transit_1 = require("eos-transit");
var eos_transit_scatter_provider_1 = __importDefault(require("eos-transit-scatter-provider"));
var eos_transit_scatter_provider_2 = __importDefault(require("eos-transit-scatter-provider"));
var eos_transit_meetone_provider_1 = __importDefault(require("eos-transit-meetone-provider"));
var eos_transit_lynx_provider_1 = __importDefault(require("eos-transit-lynx-provider"));
var TransitStateContext = react_1.createContext(undefined);
var TransitDispatchContext = react_1.createContext(undefined);
var transitReducer = function (state, action) {
    switch (action.type) {
        case 'CONNECT_WALLET_START':
            console.log('CONNECT_WALLET_START');
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
var walletProvider = localStorage.getItem('walletProvider');
var accessContext;
var getWallet = function (walletProvider) {
    var TransitWalletProvider = accessContext.getTransitWalletProvider();
    // @ts-ignore
    return accessContext.initWallet(TransitWalletProvider[providers.findIndex(function (p) { return p === walletProvider; })]);
};
var _connectWallet = function (provider, dispatch) { return __awaiter(_this, void 0, void 0, function () {
    var wallet, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dispatch({ type: 'CONNECT_WALLET_START', payload: { provider: provider } });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, getWallet(provider)];
            case 2:
                wallet = _a.sent();
                return [4 /*yield*/, wallet.connect()];
            case 3:
                _a.sent();
                return [4 /*yield*/, wallet.login()];
            case 4:
                _a.sent();
                dispatch({
                    type: 'CONNECT_WALLET',
                    payload: { wallet: wallet },
                });
                // persist provider
                localStorage.setItem('walletProvider', provider);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.error('!!!!', err_1);
                dispatch({
                    type: 'CONNECT_ERROR',
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
function TransitProvider(_a) {
    var children = _a.children, appname = _a.appname;
    var _b = react_1.useReducer(transitReducer, {
        connecting: false,
        wallet: null,
        error: null,
    }), state = _b[0], dispatch = _b[1];
    accessContext = react_1.useMemo(function () { return eos_transit_1.initAccessContext({
        appName: appname,
        network: {
            host: 'kylin.eoscanada.com',
            port: 443,
            protocol: 'https',
            chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
        },
        walletProviders: [eos_transit_scatter_provider_1.default(), eos_transit_scatter_provider_2.default(), eos_transit_lynx_provider_1.default(), eos_transit_meetone_provider_1.default()],
    }); }, [appname]);
    // reconnect
    react_1.useEffect(function () {
        if (!walletProvider)
            return;
        _connectWallet(walletProvider, dispatch);
    }, []);
    return (react_1.default.createElement(TransitStateContext.Provider, { value: state },
        react_1.default.createElement(TransitDispatchContext.Provider, { value: dispatch }, children)));
}
exports.TransitProvider = TransitProvider;
// Transit State
function useTransitState() {
    var state = react_1.useContext(TransitStateContext);
    if (state === undefined) {
        throw new Error('You must wrap your application with <TransitProvider /> in order to useTransitState().');
    }
    return state;
}
exports.useTransitState = useTransitState;
// Transit Dispatch
function useTransitDispatch() {
    var _this = this;
    var dispatch = react_1.useContext(TransitDispatchContext);
    if (dispatch === undefined) {
        throw new Error('You must wrap your application with <TransitProvider /> in order to useTransitDispatch().');
    }
    var connectWallet = react_1.useCallback(function (provider) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, _connectWallet(provider, dispatch)];
    }); }); }, [dispatch]);
    var disconnectWallet = react_1.useCallback(function () {
        dispatch({ type: 'DISCONNECT_WALLET' });
        localStorage.removeItem('walletProvider');
    }, [dispatch]);
    return {
        connectWallet: connectWallet,
        disconnectWallet: disconnectWallet,
    };
}
exports.useTransitDispatch = useTransitDispatch;
