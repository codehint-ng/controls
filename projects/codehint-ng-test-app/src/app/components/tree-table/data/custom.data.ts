
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
        id: 1,
        parentId: null,
        data1: 'data1_1',
        data2: 'data2_1',
        data3: 'data3_1'
      },
      {
        id: 2,
        parentId: 1,
        data1: 'data1_2',
        data2: 'data2_2',
        data3: 'data3_2'
      },
      {
        id: 3,
        parentId: 2,
        data1: 'data1_3',
        data2: 'data2_3',
        data3: 'data3_3'
      }

    ];
    return items;
  }

}
