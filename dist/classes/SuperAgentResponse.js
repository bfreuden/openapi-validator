"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractResponse_1 = __importDefault(require("./AbstractResponse"));
const isEmptyObj = (obj) => !!obj && Object.entries(obj).length === 0 && obj.constructor === Object;
class SuperAgentResponse extends AbstractResponse_1.default {
    constructor(res) {
        super(res);
        this.status = res.status;
        this.body = res.body;
        this.req = res.req;
        this.isResTextPopulatedInsteadOfResBody =
            res.text !== '{}' && isEmptyObj(this.body);
        this.bodyHasNoContent = res.text === '';
    }
    getBodyForValidation() {
        if (this.bodyHasNoContent) {
            return null;
        }
        if (this.isResTextPopulatedInsteadOfResBody) {
            return this.res.text;
        }
        return this.body;
    }
    summary() {
        const summary = super.summary();
        if (this.isResTextPopulatedInsteadOfResBody) {
            summary.text = this.res.text;
        }
        return summary;
    }
}
exports.default = SuperAgentResponse;
//# sourceMappingURL=SuperAgentResponse.js.map