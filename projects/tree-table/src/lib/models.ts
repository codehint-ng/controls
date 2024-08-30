import {TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';

export interface TreeTableColumn {
  id?: any; // for external identifiers, for example conditional class
  title: string;
  titleTemplate?: TemplateRef<any>; // instead title string, template
  template: TemplateRef<any>;
  thClass?: string;
}

export interface TreeTableItem<T> {
  id: string;
  parentId: string;
  isExpanded?: boolean;
  placeholder?: boolean;
  data: T;
}

export type SortFunction<T> = (data1: T, data2: T) => number;
export type IsSelectedFunc$<T> = (data: T) => Observable<boolean>;
export type ConditionalCellClassFunc<T> = (data: TreeTableItem<T>, column: TreeTableColumn) => string;
