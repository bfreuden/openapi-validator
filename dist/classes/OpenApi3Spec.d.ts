import AbstractOpenApiSpec from './AbstractOpenApiSpec';
export default class OpenApi3Spec extends AbstractOpenApiSpec {
    didUserDefineServers: boolean;
    constructor(spec: any);
    /**
     * "If the servers property is not provided, or is an empty array, the default value would be a Server Object with a url value of '/'"
     * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#fixed-fields
     */
    ensureDefaultServer(): void;
    /**
     * @returns {[ServerObject]} [ServerObject] {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#server-object}
     */
    servers(): any;
    getServerUrls(): any;
    getMatchingServerUrls(pathname: any): any;
    getMatchingServerBasePaths(pathname: any): any;
    findOpenApiPathMatchingPathname(pathname: any): any;
    /**
     * @returns {ResponseObject} ResponseObject
     * {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#componentsResponses}
     */
    findResponseDefinition(referenceString: any): any;
    /**
     * @returns {[ComponentsObject]} ComponentsObject
     * {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#componentsObject}
     */
    getComponentDefinitions(): any;
    getComponentDefinitionsProperty(): {
        components: any;
    };
    getSchemaObjects(): any;
}
//# sourceMappingURL=OpenApi3Spec.d.ts.map