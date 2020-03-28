import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CngHtmlCompilerModule} from 'html-compiler';
import {CngTabsModule} from 'codehint-ng-tabs';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CngTabsModule,
    CngHtmlCompilerModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
