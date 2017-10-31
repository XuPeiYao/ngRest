import { FunctionParameter } from './functionExtension';
import { ApiMethodConfig } from '../decorators/apiMethod';
declare global  {
    interface Function {
        parameters: FunctionParameter[];
        method: ApiMethodConfig;
        getParameters(): string[];
    }
    interface Object {
        baseUrl: string;
    }
    interface String {
        replaceAll(search: string, replacement: string): string;
    }
}
