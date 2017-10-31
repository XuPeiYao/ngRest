"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ApiBase(url) {
    return function (target) {
        target.prototype.baseUrl = url;
        return target;
    };
}
exports.ApiBase = ApiBase;
//# sourceMappingURL=apiBase.js.map