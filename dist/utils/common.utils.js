"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathnameWithoutBasePath = exports.defaultBasePath = exports.findOpenApiPathMatchingPossiblePathnames = exports.getPathname = exports.stringify = void 0;
const util_1 = require("util");
const path_parser_1 = require("path-parser");
const url_1 = __importDefault(require("url"));
const stringify = (obj) => util_1.inspect(obj, { depth: null });
exports.stringify = stringify;
// excludes the query because path = pathname + query
const getPathname = (request) => url_1.default.parse(request.path).pathname;
exports.getPathname = getPathname;
// converts all {foo} to :foo
const convertOpenApiPathToColonForm = (openApiPath) => openApiPath.replace(/{/g, ':').replace(/}/g, '');
const doesColonPathMatchPathname = (pathInColonForm, pathname) => {
    const pathParamsInPathname = new path_parser_1.Path(pathInColonForm).test(pathname); // => one of: null, {}, {exampleParam: 'foo'}
    return Boolean(pathParamsInPathname);
};
const doesOpenApiPathMatchPathname = (openApiPath, pathname) => {
    const pathInColonForm = convertOpenApiPathToColonForm(openApiPath);
    return doesColonPathMatchPathname(pathInColonForm, pathname);
};
const compareOpenApiPathsByGenericity = (openApiPath1, openApiPath2) => {
    // genericity is a based on the idea that a path with a template parameters is more generic
    // than a path without any template parameter
    // simple examples:
    //  "/a" == "/b"
    //  "/{foo}" == "/{bar}"
    //  "/{foo}" > "/a"
    //  "/a" < "/{foo}"
    // examples with templated prefix:
    //  "/{hello}/a" == "/{bye}/b"
    //  "/{hello}/{foo}" == "/{bye}/{bar}"
    //  "/{hello}/{foo}" > "/{bye}/a"
    //  "/{hello}/a" < "/{bye}/{foo}"
    // examples with hardcoded prefix:
    //  "/hello/a" == "/bye/b"
    //  "/hello/{foo}" == "/bye/{bar}"
    //  "/hello/{foo}" > "/bye/a"
    //  "/hello/a" < "/bye/{foo}"
    const pathElements1 = openApiPath1.substring(1).split(/\//);
    const pathElements2 = openApiPath2.substring(1).split(/\//);
    for (let i = 0; i < pathElements1.length && i < pathElements2.length; i++) {
        const isTemplateElement1 = pathElements1[i][0] == '{';
        const isTemplateElement2 = pathElements2[i][0] == '{';
        if (isTemplateElement1 && !isTemplateElement2) {
            return 1;
        }
        else if (!isTemplateElement1 && isTemplateElement2) {
            return -1;
        }
    }
    // returning 0 is valid because this function is called  with paths of the same length,
    // so we don't have to compare "/{foo}/a" and "/{bar}" for instance.
    return 0;
};
const findOpenApiPathMatchingPossiblePathnames = (possiblePathnames, OAPaths) => {
    let openApiPath;
    // eslint-disable-next-line no-restricted-syntax
    for (const pathname of possiblePathnames) {
        // eslint-disable-next-line no-restricted-syntax
        for (const OAPath of OAPaths) {
            if (OAPath === pathname) {
                return OAPath;
            }
            if (doesOpenApiPathMatchPathname(OAPath, pathname)) {
                // favor OAPath if it is least generic than openApiPath
                if (!openApiPath ||
                    compareOpenApiPathsByGenericity(OAPath, openApiPath) < 0) {
                    openApiPath = OAPath;
                }
            }
        }
    }
    return openApiPath;
};
exports.findOpenApiPathMatchingPossiblePathnames = findOpenApiPathMatchingPossiblePathnames;
exports.defaultBasePath = '/';
const getPathnameWithoutBasePath = (basePath, pathname) => basePath === exports.defaultBasePath ? pathname : pathname.replace(basePath, '');
exports.getPathnameWithoutBasePath = getPathnameWithoutBasePath;
//# sourceMappingURL=common.utils.js.map