"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
const openapi_schema_validator_1 = __importDefault(require("openapi-schema-validator"));
const typeof_1 = __importDefault(require("typeof"));
const common_utils_1 = require("./utils/common.utils");
const OpenApi2Spec_1 = __importDefault(require("./classes/OpenApi2Spec"));
const OpenApi3Spec_1 = __importDefault(require("./classes/OpenApi3Spec"));
function makeApiSpec(filepathOrObject) {
    const spec = loadSpec(filepathOrObject);
    validateSpec(spec);
    if (getOpenApiVersion(spec) === '2.0') {
        return new OpenApi2Spec_1.default(spec);
    }
    // if (getOpenApiVersion(spec).startsWith('3.'))
    return new OpenApi3Spec_1.default(spec);
}
exports.default = makeApiSpec;
function loadSpec(arg) {
    const argType = typeof_1.default(arg);
    try {
        if (argType === 'string') {
            return loadFile(arg);
        }
        if (argType === 'object') {
            return arg;
        }
        throw new Error(`Received type '${argType}'`);
    }
    catch (error) {
        throw new Error(`The provided argument must be either an absolute filepath or an object representing an OpenAPI specification.\nError details: ${error.message}`);
    }
}
function loadFile(filepath) {
    if (!path_1.default.isAbsolute(filepath)) {
        throw new Error(`'${filepath}' is not an absolute filepath`);
    }
    const fileData = fs_extra_1.default.readFileSync(filepath);
    try {
        return js_yaml_1.default.load(fileData);
    }
    catch (error) {
        throw new Error(`Invalid YAML or JSON:\n${error.message}`);
    }
}
function validateSpec(spec) {
    try {
        const validator = new openapi_schema_validator_1.default({
            version: getOpenApiVersion(spec),
        });
        const { errors } = validator.validate(spec);
        if (errors.length > 0) {
            throw new Error(common_utils_1.stringify(errors));
        }
    }
    catch (error) {
        throw new Error(`Invalid OpenAPI spec: ${error.message}`);
    }
}
function getOpenApiVersion(openApiSpec) {
    return (openApiSpec.swagger || // '2.0'
        openApiSpec.openapi // '3.X.X'
    );
}
//# sourceMappingURL=openApiSpecFactory.js.map