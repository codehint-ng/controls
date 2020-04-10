import {TreeTableItemShell} from './models';
import {SortFunction, TreeTableItem} from '../models';

export class Helper {
  static sortItems<T>(items: TreeTableItem<T>[], sortFunction: SortFunction<T>): TreeTableItem<T>[] {
    const sortFunc = (a: TreeTableItem<T>, b: TreeTableItem<T>) => {
      return !!a.data && !!b.data ? sortFunction(a.data, b.data) : 0;
    };
    return items.sort(sortFunc);
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
      const shell: TreeTableItemShell<T> = {
        item,
        haveChildren: false,
        level,
        isVisible: level === 0,
        parent: parent.item.id === null ? null : parent };
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

    items.forEach(item => {
      if (item.parentId === parent.id) {
        levelItems.push(item);
      } else {
        otherItems.push(item);
      }
    });
    return {levelItems, otherItems};
  }

  static removeAllShellsChildren<T>(outerShells: TreeTableItemShell<T>[], parentId: number): TreeTableItemShell<T>[] {
    let shells = outerShells;
    const removedIds = shells
      .filter(i => i.item.parentId === parentId).map(i => i.item.id);

    removedIds.forEach((id) => {
      shells = this.removeAllShellsChildren(shells, id);
    });

    return shells.filter(i => !removedIds.includes(i.item.id));
  }

  static removeAllChildren<T>(outerItems: TreeTableItem<T>[], parentId: number): TreeTableItem<T>[] {
    let items = outerItems;
    const removedIds = items
      .filter(i => i.parentId === parentId).map(i => i.id);

    removedIds.forEach((id) => {
      items = this.removeAllChildren(items, id);
    });

    return items.filter(i => !removedIds.includes(i.id));
  }
}
