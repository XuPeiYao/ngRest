ng-restclient [![npm version](https://badge.fury.io/js/ng-restclient.svg)](https://badge.fury.io/js/ng-restclient)
[![Build Status](https://travis-ci.org/XuPeiYao/ngRestClient.svg?branch=master)](https://travis-ci.org/XuPeiYao/ngRestClient) [![Downloads](https://img.shields.io/npm/dm/ng-restclient.svg)](https://www.npmjs.com/package/ng-restclient)
=====

針對Angular5+並基於修飾器的REST API Client建構器

## 快速上手
1. 安裝
```
npm install ng-restclient
```

2. 定義REST API Class(因為修飾器並不能作用在Interface上)
```typescript
import {
  ApiBase,
  ApiMethod,
  ApiParameter,
  ApiParameterTypes
} from 'ng-restclient';
import { Observable } from 'rxjs/Observable';
import { RequestMethod } from '@angular/http';

@ApiBase('https://jsonplaceholder.typicode.com')
export class FakeAPI {
  @ApiMethod({ url: '/posts/{postId}' })
  public getPost(
    @ApiParameter({ type: ApiParameterTypes.Route })
    postId: number,
    @ApiParameter() value: number
  ): Observable<JSON> {
    return null;
  }

  @ApiMethod({ url: '/posts', method: RequestMethod.Post })
  public postPost(): Observable<JSON> {
    return null;
  }

  @ApiMethod({ url: '/posts/{postId}', method: RequestMethod.Put })
  public putPost(
    @ApiParameter({ type: ApiParameterTypes.Route })
    postId: number
  ): Observable<JSON> {
    return null;
  }

  @ApiMethod({
    url: '/posts/{postId}',
    method: RequestMethod.Delete
  })
  public deletePost(
    @ApiParameter({ type: ApiParameterTypes.Route })
    postId: number
  ): Observable<JSON> {
    return null;
  }
}
```

3. 引入Module
```typescript
import { NgModule } from '@angular/core';
import { NgRestClientModule } from 'ng-restclient';
// something import

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgRestClientModule
    // something import
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

4. 透過DI取得Builder，並使用build方法產生實例
```typescript
import { Component } from '@angular/core';
import { RestClientBuilder } from 'ng-restclient';
import { FakeAPI } from './fakeAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private builder: RestClientBuilder) {
    const client: FakeAPI = builder.build(FakeAPI);
    client.getPost(1, null).subscribe(console.log);
  }
}
```
