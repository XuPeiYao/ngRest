import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { OhModule } from './oh/oh.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OhModule,
    FormsModule],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
