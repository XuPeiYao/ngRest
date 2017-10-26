import './extensions';
import { ApiParameterTypes } from './apiParameterTypes';

export function ApiParameter(config?: {
    type?: ApiParameterTypes,
    name?: string
}) {
    return function (target, propertyKey: string, parameterIndex: number) {
        const functionInstance: Function = target[propertyKey];

        const functionParameters = functionInstance.getParameters();
        functionInstance.parameters = target[propertyKey].fields || [];

        functionInstance.parameters.push({
            index : parameterIndex,
            name: functionParameters[parameterIndex],
            parameter : (config || {}).name || functionParameters[parameterIndex],
            type : (config || {}).type || ApiParameterTypes.Default
        });
    };
}
