/*********************************************头部面板数据*******************************************/
export interface Ecs_ITopPanelForm {
  // 树id
  treeId: string;
  // 树名称
  treeName: string;
  // 父节点名称
  parentNames: string;
  // 日期
  date: string;
  // 能源类型
  energyCode: string;
  // 子节点id
  childTreeId: string;
}
// 导航栏样式
export interface Ecs_INavigatorStyle {
  color: string;
  backgroundColor: string;
}

/***********************************************纵览数据**************************************************/
/**
 * 纵览数据
 */
export interface Ecs_IConsumptionData {
  percent: string;
  totalConsumptionValue: number | null;
  totalCostValue: number | null;
  pieData: Ecs_IConsumptionBarData[];
}
/**
 * 纵览-能耗饼图数据
 */
export interface Ecs_IConsumptionBarData {
  id: string;
  name: string;
  value: number | null;
}

// mock
export const mockData: Ecs_IConsumptionData = {
  totalConsumptionValue: 11243.44,
  totalCostValue: 23.24,
  percent: '33.21',
  pieData: [
    {
      id: '01000',
      name: '电',
      value: 15224.12,
    },
    {
      id: '02000',
      name: '水',
      value: 24424.67,
    },
    {
      id: '03000',
      name: '燃气',
      value: 12351.66,
    },
    {
      id: '20000',
      name: '蒸汽',
      value: 20520.59,
    },
  ],
};

/******************************************子节点数据***********************************************/
export interface Ecs_IChildTreeInfo {
  treeId: string;
  treeName: string;
  energyVO: Ecs_IChildrenEnergyVO;
  costVO: Ecs_IChildrenEnergyVO;
  barDataList: Ecs_IConsumptionBarData[];
}

export interface Ecs_IChildrenEnergyVO {
  value: number | null;
  yearAndYearRate: number | null;
  monthAndMonthRate: number | null;
}

/**
 * 图表getIndex事件
 */
export interface Ecs_IChartTouchEvent {
  currentIndex: {
    index: number;
    group: number[];
    id: string;
    legendIndex: number;
    type: string;
  };
}
