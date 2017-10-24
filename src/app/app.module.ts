import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RestClientBuilder } from './oh/restClientBuilder.service';

@NgModule({
  declarations: [
    AppComponent,
    RestClientBuilder
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
