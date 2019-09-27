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
const lodash_isequal_1 = __importDefault(require("lodash.isequal"));
const use_dfuse_client_1 = __importDefault(require("./use-dfuse-client"));
const dfuseTableReducer = (state, action) => {
    switch (action.type) {
        case 'DFUSE_LISTENING':
            return state;
        case 'DFUSE_SNAPSHOT':
            const tableSnapshotData = action.payload.data.rows.map((row) => row.json);
            return tableSnapshotData;
        case 'DFUSE_INSERT':
            return [action.payload.data.dbop.new.json, ...state];
        case 'DFUSE_REMOVE':
            const deletedRow = action.payload.data.dbop.old.json;
            return state.filter((row) => row !== deletedRow);
        case 'DFUSE_UPDATE':
            const oldRow = action.payload.data.dbop.old.json;
            const updatedRow = action.payload.data.dbop.new.json;
            return state.map((row) => (lodash_isequal_1.default(oldRow, row) ? updatedRow : row));
        case 'DFUSE_ERROR':
            return state;
        default:
            throw new Error(`Invalid action: ${action.type}`);
    }
};
function useDfuseTableStream({ code, scope, table, lower_bound, upper_bound }) {
    const client = use_dfuse_client_1.default();
    const [state, dispatch] = react_1.useReducer(dfuseTableReducer, null);
    const stream = react_1.useRef();
    const subscribe = react_1.useCallback(() => __awaiter(this, void 0, void 0, function* () {
        stream.current = yield client.streamTableRows({ code, scope, table, lower_bound, upper_bound }, (message) => {
            switch (message.type) {
                case 'listening':
                    dispatch({ type: 'DFUSE_LISTENING' });
                    break;
                case 'table_snapshot':
                    dispatch({ type: 'DFUSE_SNAPSHOT', payload: message });
                    break;
                case 'table_delta':
                    if (message.data.step === 'undo')
                        break;
                    switch (message.data.dbop.op) {
                        case 'ins':
                            dispatch({ type: 'DFUSE_INSERT', payload: message });
                            break;
                        case 'rem':
                            dispatch({ type: 'DFUSE_REMOVE', payload: message });
                            break;
                        case 'upd':
                            dispatch({ type: 'DFUSE_UPDATE', payload: message });
                            break;
                    }
                    break;
                case 'error':
                    dispatch({ type: 'DFUSE_ERROR', payload: message });
                    break;
                default:
                    throw new Error(`Unsupported type: ${message.type}`);
            }
        }, { fetch: true });
    }), [client, code, scope, table, lower_bound, upper_bound]);
    const unsubscribe = react_1.useCallback(() => {
        return stream.current && stream.current.close();
    }, []);
    return {
        state,
        subscribe,
        unsubscribe,
    };
}
exports.default = useDfuseTableStream;
//# sourceMappingURL=use-dfuse-table-stream.js.map