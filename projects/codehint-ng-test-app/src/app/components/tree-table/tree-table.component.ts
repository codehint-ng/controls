import {Component, OnInit} from '@angular/core';
import {TreeTableDataMapper} from './data/tree-table-data.mapper';
import {CustomData, CustomItem} from './data/custom.data';
import {SortFunction, TreeTableItem} from '../../../../../tree-table/src/lib/tree-table.component';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnInit {
  treeTableItems: TreeTableItem<CustomItem>[];
  sortFunction: SortFunction<CustomItem>;

  constructor() {}

  ngOnInit(): void {
    const customData: CustomItem[] = CustomData.getData();

    this.treeTableItems = TreeTableDataMapper.customDataToTreeTableItems(customData);

    this.sortFunction = (a: CustomData, b: CustomData) => {
      return 0;
    };
  }
}
