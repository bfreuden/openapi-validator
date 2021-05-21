"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_utils_1 = require("../utils/common.utils");
const AbstractOpenApiSpec_1 = __importDefault(require("./AbstractOpenApiSpec"));
const ValidationError_1 = __importDefault(require("./errors/ValidationError"));
const basePathPropertyNotProvided = (spec) => !Object.prototype.hasOwnProperty.call(spec, 'basePath');
class OpenApi2Spec extends AbstractOpenApiSpec_1.default {
    constructor(spec) {
        super(spec);
        this.didUserDefineBasePath = !basePathPropertyNotProvided(spec);
    }
    /**
     * "If the basePath property is not provided, the API is served directly under the host
     * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#fixed-fields
     */
    findOpenApiPathMatchingPathname(pathname) {
        const { basePath } = this.spec;
        if (basePath && !pathname.startsWith(basePath)) {
            throw new ValidationError_1.default('BASE_PATH_NOT_FOUND');
        }
        const pathnameWithoutBasePath = common_utils_1.getPathnameWithoutBasePath(basePath, pathname);
        const openApiPath = common_utils_1.findOpenApiPathMatchingPossiblePathnames([pathnameWithoutBasePath], this.paths());
        if (!openApiPath) {
            throw new ValidationError_1.default('PATH_NOT_FOUND');
        }
        return openApiPath;
    }
    /**
     * @returns {ResponseObject} ResponseObject
     * {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responses-definitions-object}
     */
    findResponseDefinition(referenceString) {
        const nameOfResponseDefinition = referenceString.split('#/responses/')[1];
        return this.spec.responses[nameOfResponseDefinition];
    }
    /**
     * @returns {[DefinitionsObject]} DefinitionsObject
     * {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#definitions-object}
     */
    getComponentDefinitions() {
        return this.spec.definitions;
    }
    getComponentDefinitionsProperty() {
        return { definitions: this.getComponentDefinitions() };
    }
    getSchemaObjects() {
        return this.getComponentDefinitions();
    }
}
exports.default = OpenApi2Spec;
//# sourceMappingURL=OpenApi2Spec.js.map