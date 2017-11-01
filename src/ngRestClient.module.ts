import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RestClientBuilder } from './restClientBuilder.service';

export * from './restClientBuilder.service';
export * from './decorators';

@NgModule({
    declarations: [],
    imports: [HttpModule],
    providers: [
        RestClientBuilder
    ]
})
export class NgRestClientModule { }
