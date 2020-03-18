import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { CngTabsComponent } from './cng-tabs.component';
import {CngTabComponent} from './tab/cng-tab.component';
import {CngTabContentOfDirective} from './cng-tab-content-of.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CngTabsComponent,
    CngTabComponent,
    CngTabContentOfDirective
  ],
  exports: [
    CngTabsComponent,
    CngTabComponent,
    CngTabContentOfDirective
  ]
})
export class CngTabsModule { }
