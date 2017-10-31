"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 設定類別為REST API之BASE URL
 * @param url 網址
 */
function ApiBase(url) {
    return function (target) {
        target.prototype.baseUrl = url;
        return target;
    };
}
exports.ApiBase = ApiBase;
//# sourceMappingURL=apiBase.js.map