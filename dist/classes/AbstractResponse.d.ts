export default class AbstractResponse {
    protected res: any;
    protected body: any;
    protected status: any;
    protected req: any;
    protected bodyHasNoContent: boolean;
    constructor(res: any);
    summary(): {
        body: any;
        text?: string;
    };
    toString(): string;
}
//# sourceMappingURL=AbstractResponse.d.ts.map