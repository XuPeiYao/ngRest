import { Http } from '@angular/http';
import { ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import './extensions/functionExtension';
import './extensions/stringExtension';
export declare class RestClientBuilder {
    private _http;
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
     * 使用指定型別建立Rest Client
     * @param T 指定Class
     */
    build<T>(T: new () => T): T;
}
