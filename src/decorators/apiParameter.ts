import '../extensions/functionExtension';
import { ApiParameterTypes } from './apiParameterTypes';

/**
 * 設定為API方法參數
 * @param config 參數設定
 */
export function ApiParameter(config?: {
    type?: ApiParameterTypes,
    name?: string
}) {
    return function (target, propertyKey: string, parameterIndex: number) {
      const functionInstance: Function = target[propertyKey];

      const functionParameters = functionInstance.getParameters();
      functionInstance.parameters = target[propertyKey].parameters || [];

      functionInstance.parameters.push({
        index : parameterIndex,
        name: functionParameters[parameterIndex],
        parameter : (config || {}).name || functionParameters[parameterIndex],
        type : (config || {}).type || ApiParameterTypes.Default
      });
    };
}
