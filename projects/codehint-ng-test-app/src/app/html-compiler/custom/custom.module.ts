import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomComponent} from './custom.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CustomComponent
  ],
  entryComponents: [
    CustomComponent
  ],
  exports: [
    CustomComponent
  ]
})
export class CustomModule { }
