"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../extensions/functionExtension");
var apiParameterTypes_1 = require("./apiParameterTypes");
/**
 * 設定為API方法參數
 * @param config 參數設定
 */
function ApiParameter(config) {
    return function (target, propertyKey, parameterIndex) {
        var functionInstance = target[propertyKey];
        var functionParameters = functionInstance.getParameters();
        functionInstance.parameters = target[propertyKey].parameters || [];
        functionInstance.parameters.push({
            index: parameterIndex,
            name: functionParameters[parameterIndex],
            parameter: (config || {}).name || functionParameters[parameterIndex],
            type: (config || {}).type || apiParameterTypes_1.ApiParameterTypes.Default
        });
    };
}
exports.ApiParameter = ApiParameter;
//# sourceMappingURL=apiParameter.js.map