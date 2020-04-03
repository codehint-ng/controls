import { NgModule } from '@angular/core';
import { CngTreeTableComponent } from './tree-table.component';
import {SharedModule} from './shared/shared.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [CngTreeTableComponent],
  exports: [CngTreeTableComponent]
})
export class CngTreeTableModule { }
