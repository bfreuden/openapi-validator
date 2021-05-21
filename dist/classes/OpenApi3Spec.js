"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_utils_1 = require("../utils/common.utils");
const OpenApi3Spec_utils_1 = require("../utils/OpenApi3Spec.utils");
const AbstractOpenApiSpec_1 = __importDefault(require("./AbstractOpenApiSpec"));
const ValidationError_1 = __importDefault(require("./errors/ValidationError"));
class OpenApi3Spec extends AbstractOpenApiSpec_1.default {
    constructor(spec) {
        super(spec);
        this.didUserDefineServers = !OpenApi3Spec_utils_1.serversPropertyNotProvidedOrIsEmptyArray(spec);
        this.ensureDefaultServer();
    }
    /**
     * "If the servers property is not provided, or is an empty array, the default value would be a Server Object with a url value of '/'"
     * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#fixed-fields
     */
    ensureDefaultServer() {
        if (OpenApi3Spec_utils_1.serversPropertyNotProvidedOrIsEmptyArray(this.spec)) {
            this.spec.servers = [{ url: common_utils_1.defaultBasePath }];
        }
    }
    /**
     * @returns {[ServerObject]} [ServerObject] {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#server-object}
     */
    servers() {
        return this.spec.servers;
    }
    getServerUrls() {
        return this.servers().map((server) => server.url);
    }
    getMatchingServerUrls(pathname) {
        return OpenApi3Spec_utils_1.getMatchingServerUrlsAndServerBasePaths(this.servers(), pathname).map(({ concreteUrl }) => concreteUrl);
    }
    getMatchingServerBasePaths(pathname) {
        return OpenApi3Spec_utils_1.getMatchingServerUrlsAndServerBasePaths(this.servers(), pathname).map(({ matchingBasePath }) => matchingBasePath);
    }
    findOpenApiPathMatchingPathname(pathname) {
        const matchingServerBasePaths = this.getMatchingServerBasePaths(pathname);
        if (!matchingServerBasePaths.length) {
            throw new ValidationError_1.default('SERVER_NOT_FOUND');
        }
        const possiblePathnames = matchingServerBasePaths.map((basePath) => common_utils_1.getPathnameWithoutBasePath(basePath, pathname));
        const openApiPath = common_utils_1.findOpenApiPathMatchingPossiblePathnames(possiblePathnames, this.paths());
        if (!openApiPath) {
            throw new ValidationError_1.default('PATH_NOT_FOUND');
        }
        return openApiPath;
    }
    /**
     * @returns {ResponseObject} ResponseObject
     * {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#componentsResponses}
     */
    findResponseDefinition(referenceString) {
        const nameOfResponseDefinition = referenceString.split('#/components/responses/')[1];
        return this.spec.components.responses[nameOfResponseDefinition];
    }
    /**
     * @returns {[ComponentsObject]} ComponentsObject
     * {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#componentsObject}
     */
    getComponentDefinitions() {
        return this.spec.components;
    }
    getComponentDefinitionsProperty() {
        return { components: this.getComponentDefinitions() };
    }
    getSchemaObjects() {
        return this.getComponentDefinitions().schemas;
    }
}
exports.default = OpenApi3Spec;
//# sourceMappingURL=OpenApi3Spec.js.map