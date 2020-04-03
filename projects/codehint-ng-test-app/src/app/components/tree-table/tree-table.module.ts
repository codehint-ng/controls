import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeTableComponent} from './tree-table.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TreeTableComponent
  ],
  exports: [
    TreeTableComponent
  ]
})
export class TreeTableModule { }
