import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Helper} from './helpers/items.helper';
import {TreeTableItemShell} from './helpers/models';
import {ConditionalCellClassFunc, IsSelectedFunc, SortFunction, TreeTableColumn, TreeTableItem} from './models';
import {SortHelper} from './helpers/sort.helper';

@Component({
  selector: 'cng-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class CngTreeTableComponent<T> {
  @Input() columns: TreeTableColumn[];
  @Input() sortFunction: SortFunction<T>;
  @Input() isSelectedFunc: IsSelectedFunc<T>;
  @Input() conditionalCellClassFunc: ConditionalCellClassFunc<T>;
  @Output() toggleExpandItem = new EventEmitter<TreeTableItem<T>>();
  @Output() rowClick = new EventEmitter<TreeTableItem<T>>();

  treeTableItemShells: TreeTableItemShell<T>[] = [];
  otherItems: TreeTableItem<T>[] = []; // to avoid unexpected infinite looping, if parent ids errored with never-ending cycle.

  constructor() {
  }

  insertLevelItemsFor(index: number, parentShell: TreeTableItemShell<T>, level: number) {
    let {levelItems, otherItems} = Helper.selectLevelItems(this.otherItems, parentShell.item);
    if (levelItems.length < 1) { return; }

    if (this.sortFunction) {
      levelItems = Helper.sortItems(levelItems, this.sortFunction);
    }

    const newLevelShells = Helper.itemsToShells(levelItems, level, parentShell);
    this.treeTableItemShells = Helper.arrayInsertItems(this.treeTableItemShells, index, newLevelShells);

    this.otherItems = [...otherItems];
    newLevelShells.forEach((shell) => {
      shell.haveChildren = this.otherItems.some(i => i.parentId === shell.item.id);
    });
  }

  toggleExpand(event, shell: TreeTableItemShell<T>) {
    event.preventDefault();
    event.stopPropagation();

    shell.item.isExpanded = !shell.item.isExpanded;
    this.toggleExpandItem.emit(shell.item);

    if (shell.item.isExpanded) {
      const shellIndex = this.treeTableItemShells.findIndex(i => i.item.id === shell.item.id);
      this.insertLevelItemsFor(shellIndex + 1, shell, shell.level + 1);
    }

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

  // external functions
  clearItems() {
    this.treeTableItemShells = [];
    this.otherItems = [];
  }

  appendItems(items: TreeTableItem<T>[]) {
    this.otherItems = [...this.otherItems, ...items];

    const root: TreeTableItemShell<T>  = { item: {id: null} } as TreeTableItemShell<T>;
    this.insertLevelItemsFor(0, root, 0);
    this.treeTableItemShells.forEach(shell => {
      if (shell.item.isExpanded) {
        const shellIndex = this.treeTableItemShells.findIndex(i => i.item.id === shell.item.id);
        this.insertLevelItemsFor(shellIndex + 1, shell, shell.level + 1);
      } else {
        shell.haveChildren = this.otherItems.some(i => i.parentId === shell.item.id);
      }
    });

    // fix have children for already added items, but reseted above adding code
    this.treeTableItemShells.forEach(shell => {
      if (!shell.haveChildren) {
        shell.haveChildren = this.isExistsChildrenFor(shell.item.id);
      }
    });

    this.updateVisibility();
  }

  private isExistsChildrenFor(itemId: string): boolean {
    return this.treeTableItemShells
      .some(i => {
        if (!i) { return false; }
        if (!i.parent) { return false; }
        if (!i.parent.item) { return false; }
        return i.parent.item.id === itemId;
      });
  }

  getChildren(id: string): TreeTableItem<T>[] {
    const fromShells = this.treeTableItemShells
      .map(i => i.item)
      .filter(i => i.parentId === id);
    const fromItems = this.otherItems.filter(i => i.parentId === id);
    return [...fromShells, ...fromItems];
  }

  removeItem(id: string) {
    this.treeTableItemShells = Helper.removeAllShellsChildren([...this.treeTableItemShells], id);
    const shell = this.treeTableItemShells.find(i => i.item.id === id);
    if (shell && shell.parent) {
      const parentId = shell.parent.item.id;
      const isExistChildShell = this.treeTableItemShells.some(i => i.item.parentId === parentId);
      const isExistChild = this.otherItems.some(i => i.parentId === parentId);
      shell.parent.haveChildren = isExistChildShell || isExistChild;
    }

    this.treeTableItemShells = this.treeTableItemShells.filter(i => i.item.id !== id);

    this.otherItems = Helper.removeAllChildren([...this.otherItems], id);
    this.otherItems = this.otherItems
      .filter(i => i.id !== id);
  }

  sort() {
    if (!this.sortFunction) {
      console.warn('cng-tree-table: there is not sortFunction');
      return;
    }

    this.treeTableItemShells = SortHelper.getSorted(this.treeTableItemShells, this.sortFunction);
  }
}
