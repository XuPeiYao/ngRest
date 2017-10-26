import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { ApiMethodConfig } from './apiMethod';
import { ApiParameterTypes } from './apiParameterTypes';
import { Headers } from '@angular/http';
@Injectable()
export class RestClientBuilder {

  constructor(private _http: Http) {}

  private clone<T>(obj: T): T {
    return <T>JSON.parse(JSON.stringify(obj));
  }
  /**
   * 使用指定型別建立Rest Client
   * @param T 指定Class
   */
  public build<T>(T: new () => T): T {
    const HTTP = this._http;
    const baseUrl = T.prototype.baseUrl;
    const result = new T();

    // tslint:disable-next-line:forin
    for (const key in T.prototype) {
      const member = <ApiMethodConfig>T.prototype[key];

      if (!(member instanceof Function)) {
        continue;
      }

      const methodMeta = this.clone(member.method);
      const parameters = this.clone(member.parameters);

      result[key] = function(){
        // #region 拼接URL
        let url: string = baseUrl;
        if (methodMeta.url) {
          if (/^https?:\/\//g.test(methodMeta.url)) {
            url = methodMeta.url;
          } else {
            url += methodMeta.url;
          }
        }
        // 取代在路由的參數
        for (const param of parameters) {
          if (param.type !== ApiParameterTypes.Route) {
            continue;
          }
          url = url.replaceAll(`{${param.parameter}}`, arguments[param.index]);
        }
        // #endregion

        if (!methodMeta.options) {
          methodMeta.options = {};
        }

        methodMeta.options.url = undefined;

        // HTTP 方法設定
        if (!methodMeta.options.method) {
          methodMeta.options.method = RequestMethod.Get;
        }

        // HEADER 設定
        const headers = parameters.filter(x => x.type === ApiParameterTypes.Header);
        if (headers.length) {
          if (!methodMeta.options.headers) {
            methodMeta.options.headers = new Headers();
          }
          for (const header of headers) {
            methodMeta.options.headers.append(header.parameter, arguments[header.index]);
          }
        }

        const querys = parameters.filter(x => x.type === ApiParameterTypes.Query);
        if (querys.length) {
          if (!methodMeta.options.search) {
            methodMeta.options.search = {};
          }
          for (const query of querys) {
            methodMeta.options.search[query.parameter] = arguments[query.index];
          }
        }

        const bodys = parameters.filter(x => x.type === ApiParameterTypes.Body);
        if (bodys.length) {
          if (!methodMeta.options.body) {
            methodMeta.options.body = {};
          }
          for (const body of bodys) {
            methodMeta.options.body[body.parameter] = arguments[body.index];
          }
        }

        return HTTP.request(url, methodMeta.options);
      };
    }

    /*
    console.log(T.prototype.test.method);
    console.log(T.prototype.test.parameters);
    */
    return result;
  }
}
