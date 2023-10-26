// 查询条件
export interface Ecs_IFilterForm {
  treeId: string;
  treeName: string;
  date: string;
  energyCode: string;
  childTreeId: string;
}
// 导航栏样式
export interface Ecs_INavigatorStyle {
  color: string;
  backgroundColor: string;
}

// 纵览数据
export interface Ecs_IConsumptionData {
  totalConsumptionValue: number | null;
  totalCostValue: number | null;
  energyDataList: Ecs_IConsumptionEnergyData[];
}
// 纵览-能耗数据
export interface Ecs_IConsumptionEnergyData {
  energyCode: string;
  energyName: string;
  value: number | null;
}

// mock
export const mockData: Ecs_IConsumptionData = {
  totalConsumptionValue: 245140.22,
  totalCostValue: 124800.24,
  energyDataList: [
    {
      energyCode: '01000',
      energyName: '电',
      value: 1532,
    },
    {
      energyCode: '02000',
      energyName: '水',
      value: 2454,
    },
    {
      energyCode: '03000',
      energyName: '燃气',
      value: 1451,
    },
    {
      energyCode: '20000',
      energyName: '蒸汽',
      value: 2059,
    },
  ],
};
