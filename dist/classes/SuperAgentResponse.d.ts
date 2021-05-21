import AbstractResponse from './AbstractResponse';
export default class SuperAgentResponse extends AbstractResponse {
    private isResTextPopulatedInsteadOfResBody;
    constructor(res: any);
    getBodyForValidation(): any;
    summary(): {
        body: any;
        text?: string;
    };
}
//# sourceMappingURL=SuperAgentResponse.d.ts.map