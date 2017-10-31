import { Http } from '@angular/http';
import { ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import './extensions/functionExtension';
import './extensions/stringExtension';
/**
 * REST Client建構器
 */
export declare class RestClientBuilder {
    private _http;
    /**
     * API Request預設值
     */
    static default: {
        route: {};
        body: {};
        search: {};
        headers: {};
        responseType: ResponseContentType;
    };
    constructor(_http: Http);
    private static clone<T>(obj);
    /**
     * 使用指定型別建立REST Client
     * @param T 指定Class
     */
    build<T>(T: new () => T): T;
}
