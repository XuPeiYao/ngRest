import { RequestOptionsArgs } from '@angular/http';

export declare interface ApiMethodConfig extends RequestOptionsArgs {
  isFormData?: boolean;
}

export function ApiMethod(config?: ApiMethodConfig) {
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value.method = config || {};
    descriptor.value.method.name = propertyKey;
  };
}
