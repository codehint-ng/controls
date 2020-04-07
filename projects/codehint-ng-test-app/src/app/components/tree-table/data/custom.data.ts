
export interface CustomItem {
  id: number;
  parentId: number;
  data1: string;
  data2: string;
  data3: string;
}

export class CustomData {

  static getData(): CustomItem[]  {
    const items: CustomItem[] = [
      {
        id: 0,
        parentId: null,
        data1: 'data1_1',
        data2: 'data2_1',
        data3: 'data3_1'
      }
    ];
    return items;
  }

}
