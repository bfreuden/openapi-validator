import AbstractOpenApiSpec from './AbstractOpenApiSpec';
export default class OpenApi2Spec extends AbstractOpenApiSpec {
    didUserDefineBasePath: boolean;
    constructor(spec: any);
    /**
     * "If the basePath property is not provided, the API is served directly under the host
     * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#fixed-fields
     */
    findOpenApiPathMatchingPathname(pathname: any): any;
    /**
     * @returns {ResponseObject} ResponseObject
     * {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responses-definitions-object}
     */
    findResponseDefinition(referenceString: any): any;
    /**
     * @returns {[DefinitionsObject]} DefinitionsObject
     * {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#definitions-object}
     */
    getComponentDefinitions(): any;
    getComponentDefinitionsProperty(): {
        definitions: any;
    };
    getSchemaObjects(): any;
}
//# sourceMappingURL=OpenApi2Spec.d.ts.map