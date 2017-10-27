import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestMethod, Response } from '@angular/http';
import { ApiParameterTypes } from './apiParameterTypes';
import { Headers, ResponseContentType } from '@angular/http';
@Injectable()
export class RestClientBuilder {
  public static default = {
    route: {},
    body: {},
    search: {},
    headers: {},
    responseType: ResponseContentType.Json
  };

  constructor(private _http: Http) {}

  private static clone<T>(obj: T): T {
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
      const member = <Function>T.prototype[key];

      if (!(member instanceof Function)) {
        continue;
      }

      const methodMeta = RestClientBuilder.clone(member.method);
      const parameters = RestClientBuilder.clone(member.parameters || []);

      result[key] = function () {
        //#region 拼接URL
        let url: string = baseUrl;
        if (methodMeta.url) {
          if (/^https?:\/\//g.test(methodMeta.url)) {
            url = methodMeta.url;
          } else {
            url += methodMeta.url;
          }
        }
        //#endregion

        //#region 取代在路由的參數
        for (const param of parameters) {
          if (param.type !== ApiParameterTypes.Route) {
            continue;
          }
          url = url.replaceAll(`{${param.parameter}}`, arguments[param.index]);
        }
        if (RestClientBuilder.default && RestClientBuilder.default.route) { // 預設值
          // tslint:disable-next-line:forin
          for (const paramName in RestClientBuilder.default.route) {
            url = url.replaceAll(`{${paramName}}`, RestClientBuilder.default.route[paramName]);
          }
        }

        //#endregion

        // HTTP 方法設定
        if (!methodMeta.method) {
          methodMeta.method = RequestMethod.Get;
        }
        const ARGS = arguments;
        //#region 初始化Request參數
        function initParameters(type: ApiParameterTypes) {
          const target = parameters.filter(x => x.type === type);

          // tslint:disable-next-line:no-shadowed-variable
          let key = 'search';
          switch (type) {
            case ApiParameterTypes.Search:
              key = 'search';
              break;
            case ApiParameterTypes.Body:
              key = 'body';
              break;
            case ApiParameterTypes.Header:
              key = 'headers';
              break;
          }

          if (target.length) {
            if (!methodMeta[key]) {
              if (RestClientBuilder.default && RestClientBuilder.default[key]) {
                methodMeta[key] = RestClientBuilder.clone(RestClientBuilder.default[key]);
              } else {
                methodMeta[key] = {};
              }
            }
            for (const targetItem of target) {
              let value = ARGS[targetItem.index];
              if (value instanceof Function) {
                value = value();
              }
              methodMeta[key][targetItem.parameter] = value;
            }
          }
        }

        initParameters(ApiParameterTypes.Header);
        initParameters(ApiParameterTypes.Search);
        initParameters(ApiParameterTypes.Body);
        //#endregion

        methodMeta.url = url;

        // tslint:disable-next-line:no-shadowed-variable
        let result: Observable<Response>;
        if (methodMeta.method === RequestMethod.Post && methodMeta.isFormData) {
          const formData = new FormData();
          // tslint:disable-next-line:forin
          for (const key in methodMeta.body) {
            formData.append(key, methodMeta.body[key]);
          }
          methodMeta.body = null;
          result = HTTP.post(url, formData, methodMeta);
        } else {
          result = HTTP.request(url, methodMeta);
        }

        const responseType = methodMeta.responseType || RestClientBuilder.default.responseType;

        switch (responseType) {
          case ResponseContentType.Json:
            return result.map(x => {
              try {
                return x.json();
              } catch (e) {
                return null;
              }
            });
          default:
            return result;
        }
      };
    }

    /*
    console.log(T.prototype.test.method);
    console.log(T.prototype.test.parameters);
    */
    return result;
  }
}
