"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var apiParameterTypes_1 = require("./decorators/apiParameterTypes");
require("rxjs/add/operator/map");
require("./extensions/functionExtension");
require("./extensions/stringExtension");
var RestClientBuilder = /** @class */ (function () {
    function RestClientBuilder(_http) {
        this._http = _http;
    }
    RestClientBuilder_1 = RestClientBuilder;
    RestClientBuilder.clone = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
    /**
     * 使用指定型別建立Rest Client
     * @param T 指定Class
     */
    RestClientBuilder.prototype.build = function (T) {
        var HTTP = this._http;
        var baseUrl = T.prototype.baseUrl;
        var result = new T();
        var _loop_1 = function (key) {
            var member = T.prototype[key];
            if (!(member instanceof Function)) {
                return "continue";
            }
            var methodMeta = RestClientBuilder_1.clone(member.method);
            var parameters = RestClientBuilder_1.clone(member.parameters || []);
            result[key] = function () {
                //#region 拼接URL
                var url = baseUrl;
                if (methodMeta.url) {
                    if (/^https?:\/\//g.test(methodMeta.url)) {
                        url = methodMeta.url;
                    }
                    else {
                        url += methodMeta.url;
                    }
                }
                //#endregion
                //#region 取代在路由的參數
                for (var _i = 0, parameters_1 = parameters; _i < parameters_1.length; _i++) {
                    var param = parameters_1[_i];
                    if (param.type !== apiParameterTypes_1.ApiParameterTypes.Route) {
                        continue;
                    }
                    url = url.replaceAll("{" + param.parameter + "}", arguments[param.index]);
                }
                if (RestClientBuilder_1.default && RestClientBuilder_1.default.route) {
                    // tslint:disable-next-line:forin
                    for (var paramName in RestClientBuilder_1.default.route) {
                        url = url.replaceAll("{" + paramName + "}", RestClientBuilder_1.default.route[paramName]);
                    }
                }
                //#endregion
                // HTTP 方法設定
                if (!methodMeta.method) {
                    methodMeta.method = http_1.RequestMethod.Get;
                }
                var ARGS = arguments;
                //#region 初始化Request參數
                function initParameters(type) {
                    var target = parameters.filter(function (x) { return x.type === type; });
                    // tslint:disable-next-line:no-shadowed-variable
                    var key = 'search';
                    switch (type) {
                        case apiParameterTypes_1.ApiParameterTypes.Search:
                            key = 'search';
                            break;
                        case apiParameterTypes_1.ApiParameterTypes.Body:
                            key = 'body';
                            break;
                        case apiParameterTypes_1.ApiParameterTypes.Header:
                            key = 'headers';
                            break;
                    }
                    if (target.length) {
                        if (!methodMeta[key]) {
                            if (RestClientBuilder_1.default && RestClientBuilder_1.default[key]) {
                                methodMeta[key] = RestClientBuilder_1.clone(RestClientBuilder_1.default[key]);
                            }
                            else {
                                methodMeta[key] = {};
                            }
                        }
                        for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
                            var targetItem = target_1[_i];
                            var value = ARGS[targetItem.index];
                            if (value instanceof Function) {
                                value = value();
                            }
                            methodMeta[key][targetItem.parameter] = value;
                        }
                    }
                }
                initParameters(apiParameterTypes_1.ApiParameterTypes.Header);
                initParameters(apiParameterTypes_1.ApiParameterTypes.Search);
                initParameters(apiParameterTypes_1.ApiParameterTypes.Body);
                //#endregion
                methodMeta.url = url;
                // tslint:disable-next-line:no-shadowed-variable
                var result;
                if (methodMeta.method === http_1.RequestMethod.Post && methodMeta.isFormData) {
                    var formData = new FormData();
                    // tslint:disable-next-line:forin
                    for (var key_1 in methodMeta.body) {
                        formData.append(key_1, methodMeta.body[key_1]);
                    }
                    methodMeta.body = null;
                    result = HTTP.post(url, formData, methodMeta);
                }
                else {
                    result = HTTP.request(url, methodMeta);
                }
                var responseType = methodMeta.responseType || RestClientBuilder_1.default.responseType;
                switch (responseType) {
                    case http_2.ResponseContentType.Json:
                        return result.map(function (x) {
                            try {
                                return x.json();
                            }
                            catch (e) {
                                return null;
                            }
                        });
                    default:
                        return result;
                }
            };
        };
        // tslint:disable-next-line:forin
        for (var key in T.prototype) {
            _loop_1(key);
        }
        return result;
    };
    RestClientBuilder.default = {
        route: {},
        body: {},
        search: {},
        headers: {},
        responseType: http_2.ResponseContentType.Json
    };
    RestClientBuilder = RestClientBuilder_1 = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.Http])
    ], RestClientBuilder);
    return RestClientBuilder;
    var RestClientBuilder_1;
}());
exports.RestClientBuilder = RestClientBuilder;
//# sourceMappingURL=restClientBuilder.service.js.map