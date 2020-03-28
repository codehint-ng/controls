import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CngHtmlCompilerModule} from 'html-compiler';
import {HtmlCompilerComponent} from './html-compiler.component';

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
