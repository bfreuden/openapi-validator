"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openapi_response_validator_1 = __importDefault(require("openapi-response-validator"));
const common_utils_1 = require("../utils/common.utils");
const ValidationError_1 = __importDefault(require("./errors/ValidationError"));
class OpenApiSpec {
    constructor(spec) {
        this.spec = spec;
    }
    /**
     * @returns {[PathItemObject]} [PathItemObject]
     * @see OpenAPI2 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#path-item-object}
     * @see OpenAPI3 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#pathItemObject}
     */
    pathsObject() {
        return this.spec.paths;
    }
    getPathItem(openApiPath) {
        return this.pathsObject()[openApiPath];
    }
    paths() {
        return Object.keys(this.pathsObject());
    }
    getSchemaObject(schemaName) {
        const schemaObjects = this.getSchemaObjects();
        return schemaObjects[schemaName];
    }
    /**
     * @returns {ResponseObject} ResponseObject
     * @see OpenAPI2 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#response-object}
     * @see OpenAPI3 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#responseObject}
     */
    findExpectedResponse(actualResponse) {
        const actualRequest = actualResponse.req;
        const expectedResponseOperation = this.findExpectedResponseOperation(actualRequest);
        if (!expectedResponseOperation) {
            throw new ValidationError_1.default('METHOD_NOT_FOUND');
        }
        const { status } = actualResponse;
        let expectedResponse = expectedResponseOperation.responses[status];
        if (expectedResponse && expectedResponse.$ref) {
            expectedResponse = this.findResponseDefinition(expectedResponse.$ref);
        }
        if (!expectedResponse) {
            throw new ValidationError_1.default('STATUS_NOT_FOUND');
        }
        return { [status]: expectedResponse };
    }
    findOpenApiPathMatchingRequest(actualRequest) {
        const actualPathname = common_utils_1.getPathname(actualRequest);
        const openApiPath = this.findOpenApiPathMatchingPathname(actualPathname);
        return openApiPath;
    }
    /**
     * @returns {PathItemObject} PathItemObject
     * @see OpenAPI2 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#path-item-object}
     * @see OpenAPI3 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#pathItemObject}
     */
    findExpectedPathItem(actualRequest) {
        const actualPathname = common_utils_1.getPathname(actualRequest);
        const openApiPath = this.findOpenApiPathMatchingPathname(actualPathname);
        const pathItemObject = this.getPathItem(openApiPath);
        return pathItemObject;
    }
    /**
     * @returns {OperationObject} OperationObject
     * @see OpenAPI2 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#operation-object}
     * @see OpenAPI3 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#operationObject}
     */
    findExpectedResponseOperation(actualRequest) {
        const pathItemObject = this.findExpectedPathItem(actualRequest);
        const operationObject = pathItemObject[actualRequest.method.toLowerCase()];
        return operationObject;
    }
    validateResponse(actualResponse) {
        let expectedResponse;
        try {
            expectedResponse = this.findExpectedResponse(actualResponse);
        }
        catch (error) {
            if (error instanceof ValidationError_1.default) {
                return error;
            }
            throw error;
        }
        const resValidator = new openapi_response_validator_1.default({
            responses: expectedResponse,
            ...this.getComponentDefinitionsProperty(),
        });
        const [expectedResStatus] = Object.keys(expectedResponse);
        const validationError = resValidator.validateResponse(expectedResStatus, actualResponse.getBodyForValidation());
        if (validationError) {
            return new ValidationError_1.default('INVALID_BODY', validationError.errors
                .map(({ path, message }) => `${path} ${message}`)
                .join(', '));
        }
        return null;
    }
    /*
     * For consistency and to save maintaining another dependency,
     * we validate objects using our response validator:
     * We put the object inside a mock response, then validate
     * the whole response against a mock expected response.
     * The 2 mock responses are identical except for the body,
     * thus validating the object against its schema.
     */
    validateObject(actualObject, schema) {
        const mockResStatus = 200;
        const mockExpectedResponse = { [mockResStatus]: { schema } };
        const resValidator = new openapi_response_validator_1.default({
            responses: mockExpectedResponse,
            ...this.getComponentDefinitionsProperty(),
            errorTransformer: ({ path, message }) => ({
                message: `${path.replace('response', 'object')} ${message}`,
            }),
        });
        const validationError = resValidator.validateResponse(mockResStatus, actualObject);
        if (validationError) {
            return new ValidationError_1.default('INVALID_OBJECT', validationError.errors.map((error) => error.message).join(', '));
        }
        return null;
    }
}
exports.default = OpenApiSpec;
//# sourceMappingURL=AbstractOpenApiSpec.js.map