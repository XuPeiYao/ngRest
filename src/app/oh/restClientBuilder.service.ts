import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class RestClientBuilder {

  constructor(private _http: Http) { }

  /**
   * 使用指定型別建立Rest Client
   * @param T 指定Class
   */
  public build<T>(T: new () => T): T {
    return null;
  }
}
