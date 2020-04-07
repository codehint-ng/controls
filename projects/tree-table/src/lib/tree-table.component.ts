import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef} from '@angular/core';

export interface TreeTableColumn {
  id?: any; // for external identifiers, for example conditional class
  title: string;
  titleTemplate?: TemplateRef<any>; // instead title string, template
  template: TemplateRef<any>;
  thClass?: string;
}

export interface TreeTableData<T> {
  rootParentId?: number;
  treeTableItems: TreeTableItem<T>[];
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

interface TreeTableItemShell<T> {
  item: TreeTableItem<T>;
  parent: TreeTableItemShell<T>;
  haveChildren: boolean;
  level: number;
  isVisible: boolean;
}

@Component({
  selector: 'cng-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class CngTreeTableComponent<T>  implements OnChanges {
  @Input() columns: TreeTableColumn[];
  @Input() treeTableData: TreeTableData<T>;
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
    if (changes.treeTableData.previousValue !== changes.treeTableData.currentValue) {
      this.treeTableItemShells = [];
      this.otherItems = [...this.treeTableData.treeTableItems];
      this.insertLevelItemsFor(0, this.treeTableData.rootParentId || 0, 0);
      this.updateVisibility();
    }
  }

  insertLevelItemsFor(index: number, parentOrNumber: TreeTableItemShell<T> | number, level: number) {
    let parent = null;
    let parentId = typeof(parentOrNumber) === 'number' ? parentOrNumber : 0;
    if (typeof(parentOrNumber) === 'object') {
      parent = parentOrNumber;
      parentId = parentOrNumber.item.id;
    }

    let {levelItems, otherItems} = Helper.selectLevelItems(this.otherItems, parentId);
    if (this.sortFunction) {
      levelItems = Helper.sortItems(levelItems, this.sortFunction);
    }

    const newLevelShells = Helper.itemsToShells(levelItems, level, parent);
    this.treeTableItemShells = Helper.arrayInsertItems(this.treeTableItemShells, index, newLevelShells);

    this.otherItems = [...otherItems];
    if (newLevelShells.length > 0) { // mark parent have children
      const parentShell = this.treeTableItemShells.find(i => i.item.id === parentId);
      if (parentShell) { parentShell.haveChildren = true; }
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

class Helper {
  static sortItems<T>(items: TreeTableItem<T>[], sortFunction: SortFunction<T>): TreeTableItem<T>[] {
    return items.sort((a: TreeTableItem<T>, b: TreeTableItem<T>) => {
      return !!a.data && !!b.data ? sortFunction(a.data, b.data) : 0;
    });
  }

  static allParentsExpanded<T>(shell: TreeTableItemShell<T>): boolean {
    let parent = shell.parent;
    while (!!parent) {
      if (!parent.item.isExpanded) { return false; }
      parent = parent.parent;
    }
    return true;
  }

  static itemsToShells<T>(items: TreeTableItem<T>[], level: number, parent: TreeTableItemShell<T>): TreeTableItemShell<T>[] {
    const shells = items.map(item => {
      const shell: TreeTableItemShell<T> = { item, haveChildren: false, level, isVisible: level === 0, parent };
      return shell;
    });
    return shells;
  }

  static arrayInsertItems(arr: any[], index, newItems: any[]): any[] {
    const newArr = [...arr.slice(0, index), ...newItems, ...arr.slice(index)];
    return newArr;
  }

  static selectLevelItems<T>(items: TreeTableItem<T>[], parentId): {levelItems: TreeTableItem<T>[], otherItems: TreeTableItem<T>[]}  {
    const levelItems: TreeTableItem<T>[] = [];
    const otherItems: TreeTableItem<T>[] = [];
    items.forEach(item => {
      if (item.parentId === parentId) {
        levelItems.push(item);
      } else {
        otherItems.push(item);
      }
    });
    return {levelItems, otherItems};
  }
}
