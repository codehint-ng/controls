# @codehint-ng/tree-table

A simple component to display tree-hierarchically data in table.

## Usage

1) Register the @codehint-ng/tree-table in your module:

        import { CngTreeTableModule } from '@codehint-ng/tree-table';

        @NgModule({
        imports: [
            CngTreeTableModule
            ...
        ],
        ...
 
2) Prepare your custom tree-hierarchically data for passing it into cng-tree-table 
component: 

    For example: You have some tree data like this:
    
        export interface CustomItem {
            id: number;
            parentId: number;
            data1: string;
            data2: string;
            data3: string;
        }
        
        myCustomData: CustomItem[] = [...];
     
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
    
        myCustomData: CustomItem[] = [...];
        treeTableItems: TreeTableItem<CustomItem>[];
        
        ngOnInit() {
            this.treeTableItems = customDataToTreeTableItems(this.myCustomData);
            ....
        }
            
        
3) Then define displaying treeTableItems in your component template:
 
        <cng-tree-table
            [columns]="[
                {title: 'Column1', template: tmplColumn1},
                {title: 'Column2', template: tmplColumn2},
                {title: 'Column3', template: tmplColumn3}
            ]"
            [treeTableItems]="treeTableItems"
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
