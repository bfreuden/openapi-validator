"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AxiosResponse_1 = __importDefault(require("./classes/AxiosResponse"));
const SuperAgentResponse_1 = __importDefault(require("./classes/SuperAgentResponse"));
const RequestPromiseResponse_1 = __importDefault(require("./classes/RequestPromiseResponse"));
function makeResponse(res) {
    if (Object.prototype.hasOwnProperty.call(res, 'data')) {
        return new AxiosResponse_1.default(res);
    }
    if (Object.prototype.hasOwnProperty.call(res, 'status')) {
        return new SuperAgentResponse_1.default(res);
    }
    return new RequestPromiseResponse_1.default(res);
}
exports.default = makeResponse;
//# sourceMappingURL=responseFactory.js.map