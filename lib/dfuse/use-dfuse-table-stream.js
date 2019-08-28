"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lodash_isequal_1 = __importDefault(require("lodash.isequal"));
var use_dfuse_client_1 = __importDefault(require("./use-dfuse-client"));
var dfuseTableReducer = function (state, action) {
    switch (action.type) {
        case 'DFUSE_LISTENING':
            return state;
        case 'DFUSE_SNAPSHOT':
            var tableSnapshotData = action.payload.data.rows.map(function (row) { return row.json; });
            return tableSnapshotData;
        case 'DFUSE_INSERT':
            return [action.payload.data.dbop.new.json].concat(state);
        case 'DFUSE_REMOVE':
            var deletedRow_1 = action.payload.data.dbop.old.json;
            return state.filter(function (row) { return row !== deletedRow_1; });
        case 'DFUSE_UPDATE':
            var oldRow_1 = action.payload.data.dbop.old.json;
            var updatedRow_1 = action.payload.data.dbop.new.json;
            return state.map(function (row) { return (lodash_isequal_1.default(oldRow_1, row) ? updatedRow_1 : row); });
        case 'DFUSE_ERROR':
            return state;
        default:
            throw new Error("Invalid action: " + action.type);
    }
};
function useDfuseTableStream(_a) {
    var _this = this;
    var code = _a.code, scope = _a.scope, table = _a.table, lower_bound = _a.lower_bound, upper_bound = _a.upper_bound;
    var client = use_dfuse_client_1.default();
    var _b = react_1.useReducer(dfuseTableReducer, null), state = _b[0], dispatch = _b[1];
    var stream = react_1.useRef();
    var subscribe = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = stream;
                    return [4 /*yield*/, client.streamTableRows({ code: code, scope: scope, table: table, lower_bound: lower_bound, upper_bound: upper_bound }, function (message) {
                            // console.log(message)
                            switch (message.type) {
                                case 'listening':
                                    dispatch({ type: 'DFUSE_LISTENING' });
                                    break;
                                case 'table_snapshot':
                                    dispatch({ type: 'DFUSE_SNAPSHOT', payload: message });
                                    break;
                                case 'table_delta':
                                    // TODO: handle microforks https://docs.dfuse.io/#websocket-never-miss-a-beat
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
                                    throw new Error("Unsupported type: " + message.type);
                            }
                        }, { fetch: true })];
                case 1:
                    _a.current = _b.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [client, code, scope, table, lower_bound, upper_bound]);
    var unsubscribe = react_1.useCallback(function () {
        return stream.current && stream.current.close();
    }, []);
    return {
        state: state,
        subscribe: subscribe,
        unsubscribe: unsubscribe,
    };
}
exports.default = useDfuseTableStream;
