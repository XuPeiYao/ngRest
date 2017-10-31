import { RequestOptionsArgs } from '@angular/http';
export interface ApiMethodConfig extends RequestOptionsArgs {
    isFormData?: boolean;
}
export declare function ApiMethod(config?: ApiMethodConfig): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
