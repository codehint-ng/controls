import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeTableComponent} from './tree-table.component';
import {CngTreeTableModule} from '../../../../../tree-table/src/lib/tree-table.module';


@NgModule({
  imports: [
    CommonModule,
    CngTreeTableModule
  ],
  declarations: [
    TreeTableComponent
  ],
  exports: [
    TreeTableComponent
  ]
})
export class TreeTableModule { }
