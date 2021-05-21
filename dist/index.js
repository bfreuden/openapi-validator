"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResponse = exports.makeApiSpec = void 0;
var openApiSpecFactory_1 = require("./openApiSpecFactory");
Object.defineProperty(exports, "makeApiSpec", { enumerable: true, get: function () { return __importDefault(openApiSpecFactory_1).default; } });
var responseFactory_1 = require("./responseFactory");
Object.defineProperty(exports, "makeResponse", { enumerable: true, get: function () { return __importDefault(responseFactory_1).default; } });
//# sourceMappingURL=index.js.map