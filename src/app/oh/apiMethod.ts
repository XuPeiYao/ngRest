import { RequestOptionsArgs } from '@angular/http';

export function apiMethod(config?: {
    url?: string,
    options?: RequestOptionsArgs
}) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value.method = config || {};
        descriptor.value.method.name = propertyKey;
    };
}
