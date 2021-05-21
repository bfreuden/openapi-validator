import ValidationError from './errors/ValidationError';
export default abstract class OpenApiSpec {
    protected spec: any;
    protected abstract getSchemaObjects(): any;
    protected abstract findResponseDefinition(referenceString: string): any;
    protected abstract findOpenApiPathMatchingPathname(pathname: string): any;
    protected abstract getComponentDefinitionsProperty(): any;
    constructor(spec: any);
    /**
     * @returns {[PathItemObject]} [PathItemObject]
     * @see OpenAPI2 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#path-item-object}
     * @see OpenAPI3 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#pathItemObject}
     */
    pathsObject(): any;
    getPathItem(openApiPath: any): any;
    paths(): string[];
    getSchemaObject(schemaName: any): any;
    /**
     * @returns {ResponseObject} ResponseObject
     * @see OpenAPI2 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#response-object}
     * @see OpenAPI3 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#responseObject}
     */
    findExpectedResponse(actualResponse: any): {
        [x: number]: any;
    };
    findOpenApiPathMatchingRequest(actualRequest: any): any;
    /**
     * @returns {PathItemObject} PathItemObject
     * @see OpenAPI2 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#path-item-object}
     * @see OpenAPI3 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#pathItemObject}
     */
    findExpectedPathItem(actualRequest: any): any;
    /**
     * @returns {OperationObject} OperationObject
     * @see OpenAPI2 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#operation-object}
     * @see OpenAPI3 {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#operationObject}
     */
    findExpectedResponseOperation(actualRequest: any): any;
    validateResponse(actualResponse: any): ValidationError;
    validateObject(actualObject: any, schema: any): ValidationError;
}
//# sourceMappingURL=AbstractOpenApiSpec.d.ts.map