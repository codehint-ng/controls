import {CustomItem} from './custom.data';
import {TreeTableItem} from '../../../../../../tree-table/src/lib/tree-table.component';


export class TreeTableDataMapper {
  static customDataToTreeTableItems(customData: CustomItem[]): TreeTableItem<CustomItem>[] {
    const treeTableItems = (customData || []).map((customItem: CustomItem) => {
      const item: TreeTableItem<CustomItem> = {
        id: customItem.id,
        parentId: customItem.parentId || null,
        data: customItem
      };
      return item;
    });
    return treeTableItems;
  }
}
