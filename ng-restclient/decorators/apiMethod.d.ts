import { RequestOptionsArgs } from '@angular/http';
export interface ApiMethodConfig extends RequestOptionsArgs {
    /**
     * 是否為FormData格式
     */
    isFormData?: boolean;
}
/**
 * 設定為API方法
 * @param config 方法設定
 */
export declare function ApiMethod(config?: ApiMethodConfig): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
