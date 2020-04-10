# @codehint-ng/tree-table

A simple component to display tree-hierarchically data in table.

## Usage

For example: You have some tree data like this:
    
        interface CustomItem {
            id: number;
            parentId: number;
            data1: string;
            data2: string;
            data3: string;
        }
        
        myCustomData: CustomItem[] = [...];

1) Register the @codehint-ng/tree-table in your module:

        import { CngTreeTableModule } from '@codehint-ng/tree-table';

        @NgModule({
        imports: [
            CngTreeTableModule
            ...
        ],
        ...

2) Then define displaying cng-tree-table in your component template:
 
        <cng-tree-table
            [columns]="[
                {title: 'Column1', template: tmplColumn1},
                {title: 'Column2', template: tmplColumn2},
                {title: 'Column3', template: tmplColumn3}
            ]"
        >
        </cng-tree-table>

        <ng-template #tmplColumn1 let-treeTableItem>
            {{ treeTableItem.data.data1 }}
        </ng-template>

        <ng-template #tmplColumn2 let-treeTableItem>
            {{ treeTableItem.data.data2 }}
        </ng-template>

        <ng-template #tmplColumn3 let-treeTableItem>
            {{ treeTableItem.data.data3 }}
        </ng-template>
 
3) Prepare your custom tree-hierarchically data for passing it into cng-tree-table 
component: 
     
    So you need to map it into structure TreeTableItem<T> that cng-tree-table can display, like this:
    
        function customDataToTreeTableItems(customData: CustomItem[])
                : TreeTableItem<CustomItem>[] {
                
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

4) Append your treeTableItems into cng-tree-table: 
    
        myCustomData: CustomItem[] = [...];
        @ViewChild(CngTreeTableComponent, {static: true}) cngTreeTable: CngTreeTableComponent<CustomItem>;
        
        ngOnInit() {
            const treeTableItems = customDataToTreeTableItems(this.myCustomData);
            this.cngTreeTable.appendItems(treeTableItems);
            ....
        }
