import {NgModule} from '@angular/core';
import {HtmlCompilerModule} from './html-compiler/html-compiler.module';
import {TabsModule} from './tabs/tabs.module';
import {DialogModule} from './dialog/dialog.module';
import {TreeTableModule} from './tree-table/tree-table.module';

const modules = [
  HtmlCompilerModule,
  TabsModule,
  DialogModule,
  TreeTableModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class ComponentsModule { }
