"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
    toString() {
        return this.message;
    }
}
exports.default = ValidationError;
//# sourceMappingURL=ValidationError.js.map