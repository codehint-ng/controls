import {Component, OnInit, ViewChild} from '@angular/core';
import {TreeTableDataMapper} from './data/tree-table-data.mapper';
import {CustomData, CustomItem} from './data/custom.data';
import {CngTreeTableComponent, SortFunction, TreeTableItem} from '../../../../../tree-table/src/lib/tree-table.component';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnInit {
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
    this.cngTreeTable.removeItem(3);
  }

  rowClick(item: TreeTableItem<CustomItem>) {
    const items = this.cngTreeTable.getChildren(item.id);
    const children = items.map(i => i.id).join(' ');
    alert(children);
  }

  sortFunction: SortFunction<CustomItem> = (a: CustomData, b: CustomData) => {
    return 0;
  }
}
