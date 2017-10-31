import '../extensions/functionExtension';
import { ApiParameterTypes } from './apiParameterTypes';
/**
 * 設定為API方法參數
 * @param config 參數設定
 */
export declare function ApiParameter(config?: {
    type?: ApiParameterTypes;
    name?: string;
}): (target: any, propertyKey: string, parameterIndex: number) => void;
