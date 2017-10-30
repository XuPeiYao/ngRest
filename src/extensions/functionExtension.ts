import { ApiParameterTypes } from '../decorators/apiParameterTypes';

export class FunctionParameter {
  public index: number;
  public name: string;
  public parameter: string;
  public type: ApiParameterTypes;
}

Function.prototype.getParameters = function() {
  try {
    let temp = <string>this.toString().match(/\(.+\)/g)[0];
    temp = temp.substring(1);
    temp = temp.substring(0, temp.length - 1);
    return temp.split(',').map(x => x.trim());
  } catch (e) {
    return [];
  }
};
