import './extensions';
import { ApiParameterTypes } from './apiParameterTypes';
export declare function ApiParameter(config?: {
    type?: ApiParameterTypes;
    name?: string;
}): (target: any, propertyKey: string, parameterIndex: number) => void;
