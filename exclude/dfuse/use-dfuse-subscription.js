"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_apollo_hooks_1 = require("react-apollo-hooks");
const apollo_client_1 = __importDefault(require("apollo-client"));
const apollo_link_ws_1 = require("apollo-link-ws");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const use_dfuse_client_1 = __importDefault(require("./use-dfuse-client"));
function useDfuseSubscription(query) {
    const client = use_dfuse_client_1.default();
    const subscriptionClient = react_1.useMemo(() => {
        return new subscriptions_transport_ws_1.SubscriptionClient(client.endpoints.graphqlStreamUrl, {
            lazy: true,
            connectionCallback: (error) => {
                if (error)
                    console.log('Unable to correctly initialize connection', error);
            },
            connectionParams: () => __awaiter(this, void 0, void 0, function* () {
                const { token } = yield client.getTokenInfo();
                return { Authorization: `Bearer ${token}` };
            }),
        });
    }, [client]);
    const apolloClient = react_1.useMemo(() => {
        return new apollo_client_1.default({
            cache: new apollo_cache_inmemory_1.InMemoryCache(),
            link: new apollo_link_ws_1.WebSocketLink(subscriptionClient),
        });
    }, [subscriptionClient]);
    return react_apollo_hooks_1.useSubscription(query, { client: apolloClient });
}
exports.default = useDfuseSubscription;
//# sourceMappingURL=use-dfuse-subscription.js.map