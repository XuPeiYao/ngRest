import { FunctionParameter } from './functionParameter';
import { RequestOptionsArgs } from '@angular/http';
import { ApiParameterTypes } from './apiParameterTypes';

declare global {
    interface Function {
        parameters: FunctionParameter[];
        method: RequestOptionsArgs;
        getParameters(): string[];
    }
    interface Object {
        baseUrl: string;
    }
    interface String {
        replaceAll(search: string, replacement: string): string;
    }
}

Function.prototype.getParameters = function(){
  try {
    let temp = <string> this.toString().match(/\(.+\)/g)[0];
    temp = temp.substring(1);
    temp = temp.substring(0, temp.length - 1);
    return temp.split(',').map(x => x.trim());
  } catch (e) {
    return [];
  }
};

String.prototype.replaceAll = function(search, replacement) {
    const target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
