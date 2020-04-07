import {CustomItem} from './custom.data';
import {TreeTableData} from 'tree-table';

export class TreeTableDataMapper {

  static customDataToTreeTableData(customData: CustomItem[]): TreeTableData<CustomItem> {
    const treeTableData: TreeTableData<CustomItem> = {
      rootParentId: 0,
      treeTableItems: []
    };
    return treeTableData;
  }
}
