"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 設定為API方法
 * @param config 方法設定
 */
function ApiMethod(config) {
    return function (target, propertyKey, descriptor) {
        descriptor.value.method = config || {};
        descriptor.value.method.name = propertyKey;
    };
}
exports.ApiMethod = ApiMethod;
//# sourceMappingURL=apiMethod.js.map