/**
 * 头部面板数据
 */
export interface Ea_IPanelForm {
  treeId: string;
  treeName: string;
  parentNames: string;
  date: string;
  timeUnit: string;
  energyCode: string;
  energyName: string;
  unit: string;
}

/**
 * 详情
 */
export interface Ea_IAnalysisDetailVO {
  total: number | null;
  monthAndMonthRate: number | null;
  yearAndYearRate: number | null;
  barDataList: Ea_IChartVO;
}

// 图表数据
export interface Ea_IChartVO {
  xAxis: number[];
  series: Ea_ISeriesVO[];
}

export interface Ea_ISeriesVO {
  type: string;
  data: (number | null)[];
  unit: string;
}
