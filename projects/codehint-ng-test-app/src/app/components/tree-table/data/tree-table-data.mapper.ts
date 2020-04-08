import {CustomItem} from './custom.data';
import {TreeTableData, TreeTableItem} from '../../../../../../tree-table/src/lib/tree-table.component';


export class TreeTableDataMapper {

  static customDataToTreeTableData(customData: CustomItem[]): TreeTableData<CustomItem> {
    const treeTableData: TreeTableData<CustomItem> = {
      rootParentId: 0,
      treeTableItems: this.customDataTreeTableItems(customData)
    };
    return treeTableData;
  }

  private static customDataTreeTableItems(customData: CustomItem[]): TreeTableItem<CustomItem>[] {
    const treeTableItems = (customData || []).map((customItem: CustomItem) => {
      const item: TreeTableItem<CustomItem> = {
        id: customItem.id,
        parentId: customItem.parentId || 0,
        data: customItem
      };
      return item;
    });
    return treeTableItems;
  }
}
