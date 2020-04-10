import {TreeTableItemShell} from './models';
import {SortFunction} from '../models';
import {Helper} from './items.helper';

export class SortHelper<T> {
  private static otherShells: TreeTableItemShell<any>[] = [];
  private static shells: TreeTableItemShell<any>[] = [];
  private static sortFunction: SortFunction<any> = null;

  static getSorted<T>(shells: TreeTableItemShell<T>[], sortFunction: SortFunction<T>) {
    this.otherShells = [...shells];
    this.shells = [];
    this.sortFunction = sortFunction;
    this.getShellsForLevel(0, null);
    return this.shells;
  }

  private static getShellsForLevel<T>(index: number, parentId: number) {
    let {levelShells, otherShells} = this.selectLevelShells(this.otherShells, parentId);
    if (this.sortFunction) {
      levelShells = this.sortShells(levelShells, this.sortFunction);
    }
    this.shells = Helper.arrayInsertItems(this.shells, index, levelShells);
    this.otherShells = [...otherShells];

    levelShells.forEach(shell => {
      const shellIndex = this.shells.findIndex(i => i.item.id === shell.item.id);
      this.getShellsForLevel(shellIndex + 1, shell.item.id);
    });
  }

  private static selectLevelShells<T>(shells: TreeTableItemShell<T>[], parentId: number)
                : {levelShells: TreeTableItemShell<T>[], otherShells: TreeTableItemShell<T>[]}  {
      const levelShells: TreeTableItemShell<T>[] = [];
      const otherShells: TreeTableItemShell<T>[] = [];

      shells.forEach(shell => {
        if (shell.item.parentId === parentId) {
          levelShells.push(shell);
        } else {
          otherShells.push(shell);
        }
      });
      return {levelShells, otherShells};
  }

  static sortShells<T>(shells: TreeTableItemShell<T>[], sortFunction: SortFunction<T>): TreeTableItemShell<T>[] {
    const sortFunc = (a: TreeTableItemShell<T>, b: TreeTableItemShell<T>) => {
      const data1: T = a.item.data;
      const data2: T = b.item.data;
      return !!data1 && !!data2 ? sortFunction(data1, data2) : 0;
    };
    return shells.sort(sortFunc);
  }
}
