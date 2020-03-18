import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CngTabsModule} from '../../../codehint-ng-tabs/src/lib/cng-tabs.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CngTabsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
