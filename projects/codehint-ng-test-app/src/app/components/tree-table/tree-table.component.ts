import {Component, OnInit} from '@angular/core';
import {SortFunction, TreeTableData} from 'tree-table';
import {TreeTableDataMapper} from './data/tree-table-data.mapper';
import {CustomData, CustomItem} from './data/custom.data';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnInit {
  treeTableData: TreeTableData<CustomItem>;
  sortFunction: SortFunction<CustomItem>;

  constructor() {}

  ngOnInit(): void {
    const customData: CustomItem[] = CustomData.getData();

    this.treeTableData = TreeTableDataMapper.customDataToTreeTableData(customData);

    this.sortFunction = (a: CustomData, b: CustomData) => {
      return 0;
    };
  }
}
