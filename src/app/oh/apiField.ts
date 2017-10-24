import { ApiFieldTypes } from './apiParameterTypes';
import './extensions';

export function apiField(config?: {
    type?: ApiFieldTypes,
    name?: string
}) {
    return function (target, propertyKey: string, parameterIndex: number) {
        const functionInstance: Function = target[propertyKey];

        const functionParameters = functionInstance.getParameters();
        functionInstance.fields = target[propertyKey].fields || [];

        functionInstance.fields.push({
            index : parameterIndex,
            name: functionParameters[parameterIndex],
            field : (config || {}).name || functionParameters[parameterIndex],
            type : (config || {}).type || ApiFieldTypes.Default
        });
    };
}
