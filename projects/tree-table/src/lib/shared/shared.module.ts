import {NgModule} from '@angular/core';
import {NumberToArrayPipe} from './number-to-array.pipe';
import {CommonModule} from '@angular/common';
import {ResizableTableColumnDirective} from './resizable-table-column.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NumberToArrayPipe,
    ResizableTableColumnDirective
  ],
  exports: [
    NumberToArrayPipe,
    ResizableTableColumnDirective
  ]
})
export class SharedModule { }
