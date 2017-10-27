import { RequestOptionsArgs } from '@angular/http';

export function ApiMethod(config?: RequestOptionsArgs) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value.method = config || {};
        descriptor.value.method.name = propertyKey;
    };
}
