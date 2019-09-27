"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("@dfuse/client");
const dfuse_config_context_1 = require("./dfuse-config.context");
function useDfuseConfig() {
    const config = react_1.useContext(dfuse_config_context_1.DfuseConfigContext);
    if (config === undefined) {
        throw new Error('You should useDfuseConfig() within <DfuseProvider />');
    }
    if (!config.apiKey || !config.network) {
        throw new Error('missing dfuse configuration');
    }
    const client = react_1.useMemo(() => client_1.createDfuseClient({
        apiKey: config.apiKey,
        network: config.network,
    }), [config.apiKey, config.network]);
    return client;
}
exports.default = useDfuseConfig;
//# sourceMappingURL=use-dfuse-client.js.map