
export interface CustomItem {
  id: string;
  parentId: string;
  data1: string;
  data2: string;
  data3: string;
}

export class CustomData {

  static getData(): CustomItem[]  {
    const items: CustomItem[] = [
      {
        id: '1',
        parentId: null,
        data1: 'data1_1',
        data2: 'data2_1',
        data3: 'data3_1'
      },
      {
        id: '2',
        parentId: '1',
        data1: 'data1_2',
        data2: 'data2_2',
        data3: 'data3_2'
      },
      {
        id: '7',
        parentId: '2',
        data1: 'data1_7',
        data2: 'data2_7',
        data3: 'data3_7'
      },
      {
        id: '3',
        parentId: '2',
        data1: 'data1_3',
        data2: 'data2_3',
        data3: 'data3_3'
      },
      {
        id: '4',
        parentId: '1',
        data1: 'data1_4',
        data2: 'data2_4',
        data3: 'data3_4'
      },
    ];
    return items;
  }

  static getData2(): CustomItem[]  {
    const items: CustomItem[] = [
      {
        id: '5',
        parentId: '3',
        data1: 'data1_5',
        data2: 'data2_5',
        data3: 'data3_5'
      },
      {
        id: '6',
        parentId: '5',
        data1: 'data1_6',
        data2: 'data2_6',
        data3: 'data3_6'
      },

    ];
    return items;
  }
}
