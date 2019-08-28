"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("@dfuse/client");
var dfuse_config_context_1 = require("./dfuse-config.context");
function useDfuseConfig() {
    var config = react_1.useContext(dfuse_config_context_1.DfuseConfigContext);
    if (config === undefined) {
        throw new Error('You should useDfuseConfig() within <DfuseProvider />');
    }
    if (!config.apiKey || !config.network) {
        throw new Error('missing dfuse configuration');
    }
    var client = react_1.useMemo(function () {
        return client_1.createDfuseClient({
            apiKey: config.apiKey,
            network: config.network,
        });
    }, [config.apiKey, config.network]);
    return client;
}
exports.default = useDfuseConfig;
