import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AgmCoreModule.forRoot ({
      apiKey: 'AIzaSyBW2sDZ3WW7tPB16f3PpwlxGMJqnfnwwic'  
  })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }