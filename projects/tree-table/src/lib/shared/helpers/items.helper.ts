import {SortFunction, TreeTableItem} from '../../tree-table.component';

export interface TreeTableItemShell<T> {
  item: TreeTableItem<T>;
  parent: TreeTableItemShell<T>;
  haveChildren: boolean;
  level: number;
  isVisible: boolean;
}

export class Helper {
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

  // stable
  static selectLevelItems<T>(items: TreeTableItem<T>[], parent: TreeTableItem<T>)
    : {levelItems: TreeTableItem<T>[], otherItems: TreeTableItem<T>[]}  {
    const levelItems: TreeTableItem<T>[] = [];
    const otherItems: TreeTableItem<T>[] = [];

    const levelItemsIds = this.getLevelItemsIds(items, parent);

    items.forEach(item => {
      if (levelItemsIds.includes(item.id)) {
        levelItems.push(item);
      } else {
        otherItems.push(item);
      }
    });
    return {levelItems, otherItems};
  }

  // stable
  static getLevelItemsIds<T>(items: TreeTableItem<T>[], parent: TreeTableItem<T>): number[] {
    if (!parent) { // select all ids for which there are no parents, they will be the first level
      const allIds: number[] = items.map(item => item.id);
      const parentsIds = items.filter(i => !allIds.includes(i.parentId)).map(i => i.id);
      if (parentsIds.length < 1) {
        console.warn('cng-tree-table: Cannot find any root element, possible cycled hierarchy!!!');
      }
      return parentsIds;
    } else {
      return items.filter(i => i.parentId === parent.id).map(i => i.id);
    }
  }
}
