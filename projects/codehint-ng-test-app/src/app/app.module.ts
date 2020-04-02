import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HtmlCompilerModule} from './html-compiler/html-compiler.module';
import {TabsModule} from './tabs/tabs.module';
import {DialogModule} from './dialog/dialog.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HtmlCompilerModule,
    TabsModule,
    DialogModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
