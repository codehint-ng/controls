import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HtmlCompilerComponent} from './html-compiler.component';
import {CngHtmlCompilerModule} from '../../../../../html-compiler/src/lib/html-compiler.module';

@NgModule({
  imports: [
    CommonModule,
    CngHtmlCompilerModule
  ],
  declarations: [
    HtmlCompilerComponent
  ],
  exports: [
    HtmlCompilerComponent
  ]
})
export class HtmlCompilerModule { }
