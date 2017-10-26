import { Component } from '@angular/core';
import { ApiBase } from './oh/apiBase';
import { ApiMethod } from './oh/apiMethod';
import './oh/extensions';
import { ApiParameter } from './oh/apiParameter';
import { RestClientBuilder } from './oh/restClientBuilder.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ApiParameterTypes } from './oh/apiParameterTypes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(builder: RestClientBuilder) {
    builder.build(FakeAPI).test(1)
      .map(x => x.json())
      .subscribe(x => {
        console.log(x);
      });
  }
}

@ApiBase('https://jsonplaceholder.typicode.com')
export class FakeAPI {
  @ApiMethod({url: '/posts/{postId}'})
  public test(@ApiParameter({ type : ApiParameterTypes.Route }) postId: number): Observable<Response> {
    return null;
  }
}
