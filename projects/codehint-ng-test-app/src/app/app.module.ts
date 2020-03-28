import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HtmlCompilerModule} from './html-compiler/html-compiler.module';
import {CngTabsModule} from '../../../tabs/src/lib/cng-tabs.module';

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
