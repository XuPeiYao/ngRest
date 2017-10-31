import { RequestOptionsArgs } from '@angular/http';

export declare interface ApiMethodConfig extends RequestOptionsArgs {
  /**
   * 是否為FormData格式
   */
  isFormData?: boolean;
}

/**
 * 設定為API方法
 * @param config 方法設定
 */
export function ApiMethod(config?: ApiMethodConfig) {
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value.method = config || {};
    descriptor.value.method.name = propertyKey;
  };
}
