import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CngTabsModule} from 'codehint-ng-tabs';
import {HtmlCompilerModule} from './html-compiler/html-compiler.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HtmlCompilerModule,
    CngTabsModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
