import { reactive } from 'vue';
// 接口
import type { Ea_IAnalysisDetailVO, Ea_IPanelForm } from '../energy-analysis.api';
import type { Common_IHttpResponseImpl } from '@/api/model';
import { EA_EPath } from '../constant/enum';
import { commonHttp } from '@/api/request';

interface EA_IDefaultTreeInfo {
  treeId: string;
  treeName: string;
  energyCode: string;
  energyName: string;
}

export const useEnergyAnalysisController = () => {
  // 查询默认节点
  const queryDefaultTreeInfo = (): Promise<EA_IDefaultTreeInfo> => {
    return new Promise((resolve) => {
      resolve({
        treeId: '123123',
        treeName: '测试顶级',
        energyCode: '03000',
        energyName: '电',
      });
    });
  };
  // 详情
  const analysisDetail = reactive<Ea_IAnalysisDetailVO>({
    total: null,
    monthAndMonthRate: null,
    yearAndYearRate: null,
    barDataList: {
      xAxis: [],
      series: [],
    },
  });
  // 查询能耗分析详情
  const queryAnalysisDetail = async () => {
    console.log('%c✨✨查询能耗纵览数据✨✨', 'font-size: 24px');
    analysisDetail.total = 1299213.33;
    analysisDetail.monthAndMonthRate = 0.2312;
    analysisDetail.yearAndYearRate = -0.9733;
    analysisDetail.barDataList = {
      xAxis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      series: [
        {
          type: '总能耗',
          unit: 'kwh',
          data: [123, null, 245, 765, 212, 567, 278, 783, null, 533, null, 872],
        },
        {
          type: '同比',
          unit: '%',
          data: [13.5, 20.8, 92.5, 23.7, null, 20.3, null, 20.8, 32.5, 23.7, 11.4, 20.3],
        },
        {
          type: '环比',
          unit: '%',
          data: [2.3, 12.1, 5.2, 6.2, 7.2, 2.1, 2.3, 12.1, 5.2, 6.2, 7.2, 2.1],
        },
      ],
    };

    const res: Common_IHttpResponseImpl<Ea_IAnalysisDetailVO> = await commonHttp.post(EA_EPath.查询详情);
    if (res?.success) {
      analysisDetail.total = res?.data?.total ?? null;
      analysisDetail.monthAndMonthRate = res?.data?.monthAndMonthRate ?? null;
      analysisDetail.yearAndYearRate = res?.data?.yearAndYearRate ?? null;
      analysisDetail.barDataList = {
        xAxis: res?.data?.barDataList?.xAxis?.map((item) => item) ?? [],
        series: res?.data?.barDataList?.series?.map((item) => {
          return {
            type: item?.type ?? '',
            unit: item?.unit ?? '',
            data: item?.data ?? [],
          };
        }),
      };
    }
  };

  return {
    analysisDetail,
    queryDefaultTreeInfo,
    queryAnalysisDetail,
  };
};
