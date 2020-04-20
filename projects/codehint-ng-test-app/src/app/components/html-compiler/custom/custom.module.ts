import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomComponent} from './custom.component';
import {CustomBackgroundDirective} from './custom-red-back.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CustomBackgroundDirective,
    CustomComponent
  ],
  entryComponents: [
    CustomComponent
  ],
  exports: [
    CustomBackgroundDirective,
    CustomComponent
  ]
})
export class CustomModule { }
