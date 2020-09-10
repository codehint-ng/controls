import {Component, OnInit, ViewChild} from '@angular/core';
import {TreeTableDataMapper} from './data/tree-table-data.mapper';
import {CustomData, CustomItem} from './data/custom.data';
import {CngTreeTableComponent} from '../../../../../tree-table/src/lib/tree-table.component';
import {SortFunction, TreeTableItem} from '../../../../../tree-table/src/lib/models';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnInit {
  sortDirection = true;
  @ViewChild(CngTreeTableComponent, {static: true}) cngTreeTable: CngTreeTableComponent<CustomItem>;

  constructor() {}

  ngOnInit(): void {
    const customData: CustomItem[] = CustomData.getData();

    const treeTableItems = TreeTableDataMapper.customDataToTreeTableItems(customData);

    this.cngTreeTable.appendItems(treeTableItems);
  }

  addData() {
    const customData: CustomItem[] = CustomData.getData();

    const treeTableItems = TreeTableDataMapper.customDataToTreeTableItems(customData);

    this.cngTreeTable.appendItems(treeTableItems);
  }

  addData2() {
    const customData: CustomItem[] = CustomData.getData2();

    const treeTableItems = TreeTableDataMapper.customDataToTreeTableItems(customData);

    this.cngTreeTable.appendItems(treeTableItems);
  }

  clearData() {
    this.cngTreeTable.clearItems();
  }

  removeItem() {
    this.cngTreeTable.removeItem('3');
  }

  rowClick(item: TreeTableItem<CustomItem>) {
    const items = this.cngTreeTable.getChildren(item.id);
    const children = items.map(i => i.id).join(' ');
    alert(children);
  }

  sort() {
    this.sortDirection = !this.sortDirection;
    this.cngTreeTable.sort();
  }

  sortFunction: SortFunction<CustomItem> = (a: CustomItem, b: CustomItem): number => {
    let t1 = a;
    let t2 = b;
    if (!this.sortDirection) {
      t1 = b;
      t2 = a;
    }

    if (t1.data1 < t2.data1) { return -1; }
    if (t1.data1 > t2.data1) { return 1; }
    return 0;
  }
}
