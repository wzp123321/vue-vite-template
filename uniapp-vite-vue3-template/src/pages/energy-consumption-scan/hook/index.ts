import { reactive, ref } from 'vue';
import { mockData, type Ecs_IChildTreeInfo, type Ecs_IConsumptionData } from '../energy-consumption-scan.api';
import { commonHttp } from '@/api/request';
import { Ecs_EPath } from '../constant/enum';
import type { Common_ICodeName, Common_IHttpResponseImpl } from '@/api/model';
import type { ICard_DataItem } from '../ecs-list-card/ecs-list-card.api';

export const useEnergyConsumptionController = () => {
  // 查询默认节点信息
  const queryDefaultTreeInfo = (): Promise<{ treeId: string; treeName: string }> => {
    return new Promise((resolve) => {
      resolve({
        treeId: '123123',
        treeName: '测试顶级',
      });
    });
  };
  // 纵览数据
  const energyTotalData = reactive<Ecs_IConsumptionData>({
    percent: '',
    totalConsumptionValue: null,
    totalCostValue: null,
    pieData: [],
  });
  // 查询纵览数据
  const queryEnergyTotalData = async () => {
    console.log('%c✨✨查询能耗纵览数据✨✨', 'font-size: 24px');
    energyTotalData.percent = mockData.percent;
    energyTotalData.totalConsumptionValue = mockData.totalConsumptionValue;
    energyTotalData.totalCostValue = mockData.totalCostValue;
    energyTotalData.pieData = mockData.pieData;

    const res: Common_IHttpResponseImpl<Ecs_IConsumptionData> = await commonHttp.post(Ecs_EPath.查询纵览信息);
    if (res?.success) {
      energyTotalData.percent = res?.data?.percent ?? '';
      energyTotalData.totalConsumptionValue = res?.data?.totalConsumptionValue ?? null;
      energyTotalData.totalCostValue = res?.data?.totalCostValue ?? null;
      energyTotalData.pieData = res?.data?.pieData ?? [];
    }
  };
  // 节点列表
  const treeList = ref<Common_ICodeName<string>[]>([]);
  // 子节点详情
  const treeDetail = reactive<Ecs_IChildTreeInfo>({
    treeId: '',
    treeName: '',
    energyVO: {
      value: null,
      yearAndYearRate: null,
      monthAndMonthRate: null,
    },
    costVO: {
      value: null,
      yearAndYearRate: null,
      monthAndMonthRate: null,
    },
    barDataList: [],
  });
  // 子节点列表
  const childTreeList = ref<ICard_DataItem[]>([]);
  // 查询子节点相关信息
  const queryChildrenDetailById = async () => {
    treeList.value = [
      { code: '1', name: '节点1' },
      { code: '2', name: '测测猜测节点' },
      { code: '3', name: '节点3' },
      { code: '4', name: '节点节点4' },
      { code: '5', name: '节点5节点5' },
      { code: '6', name: '节点6' },
    ];
    childTreeList.value = [
      {
        name: '门诊楼1F',
        consumption: 999999999,
        cost: 999.99,
        data: [
          {
            name: '门诊楼1F',
            consumption: 999999999,
            cost: 999.99,
            children: [
              {
                name: '儿科',
                consumption: 999999999,
                cost: 999.99,
              },
              {
                name: '六个字换行',
                consumption: 999999999,
                cost: 999.99,
              },
              {
                name: '内分泌科',
                consumption: 999999999,
                cost: 999.99,
              },
              {
                name: '骨科',
                consumption: 999999999,
                cost: 999.99,
              },
            ],
          },
          {
            name: '门诊楼3F',
            consumption: 999999999,
            cost: 999.99,
            children: [
              {
                name: '门诊楼1F',
                consumption: 999999999,
                cost: 999.99,
              },
              {
                name: '门诊楼1F',
                consumption: 999999999,
                cost: 999.99,
              },
              {
                name: '门诊楼1F',
                consumption: 999999999,
                cost: 999.99,
              },
              {
                name: '门诊楼1F',
                consumption: 999999999,
                cost: 999.99,
              },
            ],
          },
          {
            name: '门诊楼5F',
            consumption: 999999999,
            cost: 999.99,
            children: [],
          },
        ],
      },
      {
        name: '门诊楼1F',
        consumption: 999999999,
        cost: 999.99,
        data: [
          {
            name: '门诊楼1F',
            consumption: 999999999,
            cost: 999.99,
            children: [
              {
                name: '儿科',
                consumption: 999999999,
                cost: 999.99,
              },
              {
                name: '六个字换行',
                consumption: 999999999,
                cost: 999.99,
              },
              {
                name: '内分泌科',
                consumption: 999999999,
                cost: 999.99,
              },
              {
                name: '骨科',
                consumption: 999999999,
                cost: 999.99,
              },
            ],
          },
          {
            name: '门诊楼3F',
            consumption: 999999999,
            cost: 999.99,
            children: [
              {
                name: '门诊楼1F',
                consumption: 999999999,
                cost: 999.99,
              },
              {
                name: '门诊楼1F',
                consumption: 999999999,
                cost: 999.99,
              },
              {
                name: '门诊楼1F',
                consumption: 999999999,
                cost: 999.99,
              },
              {
                name: '门诊楼1F',
                consumption: 999999999,
                cost: 999.99,
              },
            ],
          },
        ],
      },
    ];
    treeDetail.treeId = '112121';
    treeDetail.treeName = '测试字节顶';
    treeDetail.energyVO = {
      value: 123129082.12,
      yearAndYearRate: 12.23,
      monthAndMonthRate: 64.11,
    };
    treeDetail.costVO = {
      value: 80059082.12,
      yearAndYearRate: 2.23,
      monthAndMonthRate: -14.11,
    };
    treeDetail.barDataList = [
      {
        id: '1312',
        name: '测试1',
        value: 12312,
      },
      {
        id: '13212',
        name: '测试3',
        value: 5782,
      },
      {
        id: '131452',
        name: '测试1测试1测试1',
        value: 6641,
      },
      {
        id: '133512',
        name: '测试6测试6',
        value: 10011,
      },
      {
        id: '132712',
        name: '测试153',
        value: 20031,
      },
    ];
    console.log('%c✨✨查询子节点信息✨✨', 'font-size: 24px');
    const res: Common_IHttpResponseImpl<Ecs_IChildTreeInfo> = await commonHttp.post(Ecs_EPath.查询子节点相关信息);
    if (res?.success) {
      treeDetail.treeId = res?.data?.treeId ?? '';
      treeDetail.treeName = res?.data?.treeName ?? '';
      treeDetail.energyVO.value = res?.data?.energyVO?.value ?? null;
      treeDetail.energyVO.yearAndYearRate = res?.data?.energyVO?.yearAndYearRate ?? null;
      treeDetail.energyVO.monthAndMonthRate = res?.data?.energyVO?.monthAndMonthRate ?? null;
      treeDetail.costVO.value = res?.data?.costVO?.value ?? null;
      treeDetail.costVO.yearAndYearRate = res?.data?.costVO?.yearAndYearRate ?? null;
      treeDetail.costVO.monthAndMonthRate = res?.data?.costVO?.monthAndMonthRate ?? null;
      treeDetail.barDataList = res?.data?.barDataList ?? [];
    }
  };

  return {
    energyTotalData,
    treeList,
    childTreeList,
    treeDetail,

    queryDefaultTreeInfo,
    queryEnergyTotalData,
    queryChildrenDetailById,
  };
};
