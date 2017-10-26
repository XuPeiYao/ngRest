import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OhModule } from './oh/oh.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OhModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
