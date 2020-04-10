import {TreeTableItem} from '../models';

export interface TreeTableItemShell<T> {
  item: TreeTableItem<T>;
  parent: TreeTableItemShell<T>;
  haveChildren: boolean;
  level: number;
  isVisible: boolean;
}
