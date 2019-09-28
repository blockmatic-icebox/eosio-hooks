"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_use_localstorage_1 = __importDefault(require("react-use-localstorage"));
var eos_transit_1 = require("eos-transit");
var eos_transit_scatter_provider_1 = __importDefault(require("eos-transit-scatter-provider"));
var eos_transit_scatter_provider_2 = __importDefault(require("eos-transit-scatter-provider"));
var eos_transit_meetone_provider_1 = __importDefault(require("eos-transit-meetone-provider"));
var eos_transit_lynx_provider_1 = __importDefault(require("eos-transit-lynx-provider"));
var transit_context_1 = require("./transit-context");
var transit_reducer_1 = __importDefault(require("./transit-reducer"));
// TODO: review this function
var getWalletProviders = function (providerList) {
    var supportedProviders = {
        scatter: function () { return eos_transit_scatter_provider_1.default(); },
        tokenpocket: function () { return eos_transit_scatter_provider_2.default(); },
        lynx: function () { return eos_transit_lynx_provider_1.default(); },
        meetone: function () { return eos_transit_meetone_provider_1.default(); },
    };
    return providerList.map(function (provider) { return supportedProviders[provider](); });
};
function TransitProvider(_a) {
    var _this = this;
    var children = _a.children, config = _a.config;
    var _b = react_use_localstorage_1.default('wallet-provider', undefined), transitProvider = _b[0], setTransitProvider = _b[1];
    var _c = transit_reducer_1.default(), state = _c[0], dispatch = _c[1];
    var accessContextConfig = react_1.useMemo(function () {
        var appName = config.appName, network = config.network;
        var walletProviders = getWalletProviders(config.providers);
        return {
            appName: appName,
            network: network,
            walletProviders: walletProviders,
        };
    }, [config]);
    var accessContext = react_1.useMemo(function () { return eos_transit_1.initAccessContext(accessContextConfig); }, [accessContextConfig]);
    var connectWallet = react_1.useCallback(function (provider) { return __awaiter(_this, void 0, void 0, function () {
        var TransitWalletProviders, providerIndex, wallet, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch({ type: 'CONNECT_WALLET_START', payload: { provider: provider } });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    TransitWalletProviders = accessContext.getWalletProviders();
                    providerIndex = config.providers.findIndex(function (p) { return p === provider; });
                    wallet = accessContext.initWallet(TransitWalletProviders[providerIndex]);
                    return [4 /*yield*/, wallet.connect()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, wallet.login()];
                case 3:
                    _a.sent();
                    dispatch({
                        type: 'CONNECT_WALLET',
                        payload: { wallet: wallet },
                    });
                    // persist provider
                    setTransitProvider(provider);
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    dispatch({ type: 'CONNECT_ERROR' });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [dispatch, accessContext, config.providers, setTransitProvider]);
    var disconnectWallet = react_1.useCallback(function () {
        dispatch({ type: 'DISCONNECT_WALLET' });
        localStorage.removeItem('walletProvider');
    }, [dispatch]);
    // reconnection to previusly used provider
    react_1.useEffect(function () {
        if (!transitProvider) {
            connectWallet(transitProvider);
        }
        return;
    }, [transitProvider, connectWallet]);
    return (react_1.default.createElement(transit_context_1.TransitContext.Provider, { value: { connectWallet: connectWallet, disconnectWallet: disconnectWallet } },
        react_1.default.createElement(transit_context_1.TransitStateContext.Provider, { value: state },
            react_1.default.createElement(transit_context_1.TransitDispatchContext.Provider, { value: dispatch }, children))));
}
exports.default = TransitProvider;
