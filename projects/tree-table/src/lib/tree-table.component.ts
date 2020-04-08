import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef} from '@angular/core';
import {Helper, TreeTableItemShell} from './shared/helpers/items.helper';

export interface TreeTableColumn {
  id?: any; // for external identifiers, for example conditional class
  title: string;
  titleTemplate?: TemplateRef<any>; // instead title string, template
  template: TemplateRef<any>;
  thClass?: string;
}

export interface TreeTableItem<T> {
  id: number;
  parentId: number;
  isExpanded?: boolean;
  placeholder?: boolean;
  data: T;
}

export type SortFunction<T> = (data1: T, data2: T) => number;
export type IsSelectedFunc<T> = (data: T) => boolean;
export type ConditionalCellClassFunc<T> = (data: TreeTableItem<T>, column: TreeTableColumn) => string;

@Component({
  selector: 'cng-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class CngTreeTableComponent<T>  implements OnChanges {
  @Input() columns: TreeTableColumn[];
  @Input() treeTableItems: TreeTableItem<T>[];
  @Input() sortFunction: SortFunction<T>;
  @Input() isSelectedFunc: IsSelectedFunc<T>;
  @Input() conditionalCellClassFunc: ConditionalCellClassFunc<T>;
  @Output() toggleExpandItem = new EventEmitter<TreeTableItem<T>>();
  @Output() rowClick = new EventEmitter<TreeTableItem<T>>();

  treeTableItemShells: TreeTableItemShell<T>[] = [];
  otherItems: TreeTableItem<T>[]; // to avoid unexpected infinite looping, if parent ids errored with never-ending cycle.

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.treeTableItems.previousValue !== changes.treeTableItems.currentValue) {
      this.treeTableItemShells = [];
      this.otherItems = [...this.treeTableItems];
      this.insertLevelItemsFor(0, null, 0);
      this.updateVisibility();
    }
  }

  insertLevelItemsFor(index: number, parentShell: TreeTableItemShell<T>, level: number) {
    let {levelItems, otherItems} = Helper.selectLevelItems(this.otherItems, (parentShell || {} as TreeTableItemShell<T>).item);
    if (this.sortFunction) {
      levelItems = Helper.sortItems(levelItems, this.sortFunction);
    }

    const newLevelShells = Helper.itemsToShells(levelItems, level, parentShell);
    this.treeTableItemShells = Helper.arrayInsertItems(this.treeTableItemShells, index, newLevelShells);

    this.otherItems = [...otherItems];
    if (newLevelShells.length > 0 && !!parentShell) { // mark parent have children
      parentShell.haveChildren = true;
    }

    newLevelShells.forEach(newLevelShell => {
      // every time recalculate index because array is changing
      const shellIndex = this.treeTableItemShells.findIndex(i => i.item.id === newLevelShell.item.id);
      this.insertLevelItemsFor(shellIndex + 1, newLevelShell, level + 1);
    });
  }

  toggleExpand(event, shell: TreeTableItemShell<T>) {
    event.preventDefault();
    event.stopPropagation();

    shell.item.isExpanded = !shell.item.isExpanded;
    this.toggleExpandItem.emit(shell.item);

    this.updateVisibility();
  }

  localRowClick(shell: TreeTableItemShell<T>) {
    this.rowClick.emit(shell.item);
  }

  isSelected(shell: TreeTableItemShell<T>): boolean {
    const data = shell.item.data;
    if (data && this.isSelectedFunc) {
      return this.isSelectedFunc(data);
    }
    return false;
  }

  private updateVisibility() {
    this.treeTableItemShells.forEach(sh => {
      sh.isVisible = Helper.allParentsExpanded(sh);
    });
  }
}
