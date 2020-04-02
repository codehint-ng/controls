import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsComponent} from './tabs.component';
import {CngTabsModule} from '../../../../tabs/src/lib/cng-tabs.module';


@NgModule({
  imports: [
    CommonModule,
    CngTabsModule,
  ],
  declarations: [
    TabsComponent
  ],
  exports: [
    TabsComponent
  ]
})
export class TabsModule { }
