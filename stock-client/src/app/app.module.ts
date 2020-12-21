import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {CoreModule} from '@core/core.module';
import { AppRoutingModule } from './app-routing.module';
import {TemplateModule} from '@shared/templates/template.module';
import {HttpInterceptors} from '@shared/services/http-interceptors/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    FormsModule,
    BrowserModule,
    TemplateModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptors,
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
