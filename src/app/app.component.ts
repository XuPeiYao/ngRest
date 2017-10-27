import { Component } from '@angular/core';
import { ApiBase } from './oh/apiBase';
import { ApiMethod } from './oh/apiMethod';
import './oh/extensions';
import { ApiParameter } from './oh/apiParameter';
import { RestClientBuilder } from './oh/restClientBuilder.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ApiParameterTypes } from './oh/apiParameterTypes';
import { RequestMethod, ResponseContentType } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(builder: RestClientBuilder) {
    const fakeApiInstance = builder.build(FakeAPI);
    fakeApiInstance.getPost(1)
      .subscribe(x => {
        console.log(x);
      });

    fakeApiInstance
      .postPost()
      .subscribe(x => {
        console.log(x);
      });

    fakeApiInstance
      .putPost(1)
      .subscribe(x => {
        console.log(x);
      });

    fakeApiInstance
      .deletePost(1)
      .subscribe(x => {
        console.log(x);
      });
  }
}

@ApiBase('https://jsonplaceholder.typicode.com')
export class FakeAPI {
  @ApiMethod({ url: '/posts/{postId}'})
  public getPost(
    @ApiParameter({ type: ApiParameterTypes.Route })
    postId: number
  ): Observable<JSON> {
    return null;
  }

  @ApiMethod({ url: '/posts', method: RequestMethod.Post })
  public postPost(): Observable<JSON> {
    return null;
  }

  @ApiMethod({ url: '/posts/{postId}', method: RequestMethod.Put})
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
