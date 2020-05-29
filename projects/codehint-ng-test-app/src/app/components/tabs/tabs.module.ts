import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsComponent} from './tabs.component';
import {CngTabsModule} from '../../../../../tabs/src/lib/cng-tabs.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    CngTabsModule,
    FormsModule
  ],
  declarations: [
    TabsComponent
  ],
  exports: [
    TabsComponent
  ]
})
export class TabsModule { }
