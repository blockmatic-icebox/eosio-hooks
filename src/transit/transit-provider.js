"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
const react_1 = __importStar(require("react"));
const react_use_1 = require("react-use");
const eos_transit_1 = require("eos-transit");
const eos_transit_scatter_provider_1 = __importDefault(require("eos-transit-scatter-provider"));
const eos_transit_scatter_provider_2 = __importDefault(require("eos-transit-scatter-provider"));
const eos_transit_meetone_provider_1 = __importDefault(require("eos-transit-meetone-provider"));
const eos_transit_lynx_provider_1 = __importDefault(require("eos-transit-lynx-provider"));
const transit_context_1 = require("./transit-context");
const transit_reducer_1 = __importDefault(require("./transit-reducer"));
const getWalletProviders = (providerList) => {
    const supportedProviders = {
        scatter: () => eos_transit_scatter_provider_1.default(),
        tokenpocket: () => eos_transit_scatter_provider_2.default(),
        lynx: () => eos_transit_lynx_provider_1.default(),
        meetone: () => eos_transit_meetone_provider_1.default(),
    };
    return providerList.map((provider) => supportedProviders[provider]());
};
function TransitProvider({ children, config }) {
    const [transitProvider, setTransitProvider] = react_use_1.useLocalStorage('wallet-provider', undefined);
    const [state, dispatch] = transit_reducer_1.default();
    const accessContextConfig = react_1.useMemo(() => {
        const { appName, network } = config;
        const walletProviders = getWalletProviders(config.providers);
        return {
            appName,
            network,
            walletProviders,
        };
    }, [config]);
    const accessContext = react_1.useMemo(() => eos_transit_1.initAccessContext(accessContextConfig), [accessContextConfig]);
    const connectWallet = react_1.useCallback((provider) => __awaiter(this, void 0, void 0, function* () {
        dispatch({ type: 'CONNECT_WALLET_START', payload: { provider } });
        try {
            const TransitWalletProviders = accessContext.getWalletProviders();
            const providerIndex = config.providers.findIndex(p => p === provider);
            const wallet = accessContext.initWallet(TransitWalletProviders[providerIndex]);
            yield wallet.connect();
            yield wallet.login();
            dispatch({
                type: 'CONNECT_WALLET',
                payload: { wallet },
            });
            setTransitProvider(provider);
        }
        catch (err) {
            dispatch({ type: 'CONNECT_ERROR' });
        }
    }), [dispatch, accessContext]);
    const disconnectWallet = react_1.useCallback(() => {
        dispatch({ type: 'DISCONNECT_WALLET' });
        localStorage.removeItem('walletProvider');
    }, [dispatch]);
    react_1.useEffect(() => {
        if (!transitProvider) {
            connectWallet(transitProvider);
        }
        return;
    }, [transitProvider]);
    return (react_1.default.createElement(transit_context_1.TransitContext.Provider, { value: { connectWallet, disconnectWallet } },
        react_1.default.createElement(transit_context_1.TransitStateContext.Provider, { value: state },
            react_1.default.createElement(transit_context_1.TransitDispatchContext.Provider, { value: dispatch }, children))));
}
exports.TransitProvider = TransitProvider;
//# sourceMappingURL=transit-provider.js.map