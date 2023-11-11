import { ref } from 'vue';
import { commonHttp } from '@/api/request';
import { Common_EPath } from '@/config/enum';
import type { Common_IEnergyVO, Common_IHttpResponseImpl } from '@/api/model';

// 能源类型、树查询公共逻辑
export const useCommonEnergy = () => {
  // 能源类型
  const energyCode = ref<string>('');
  // 能源类型列表
  const energyCodeList = ref<Common_IEnergyVO[]>([]);
  /**
   * 查询能源类型列表
   */
  const queryEnergyCodeList = async () => {
    energyCodeList.value = [
      {
        code: '00000',
        name: '总能耗',
        unit: '',
      },
      {
        code: '01000',
        name: '电',
        unit: 'kwh',
      },
      {
        code: '02000',
        name: '水',
        unit: 'm³',
      },
      {
        code: '03000',
        name: '燃气',
        unit: 'm³',
      },
      {
        code: '20000',
        name: '蒸汽',
        unit: 'm³',
      },
    ];
    energyCode.value = energyCodeList.value?.[0]?.code ?? '';

    try {
      const res: Common_IHttpResponseImpl<Common_IEnergyVO[]> = await commonHttp.post(
        Common_EPath.查询带总能耗的能源类型列表,
      );
      console.log('%c✨✨查询能源类型✨✨', 'font-size: 24px', res);
      if (res?.success) {
        energyCodeList.value = res?.data ?? [];
        energyCode.value = res?.data?.[0]?.code ?? '';
      } else {
        throw res;
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    energyCode,
    energyCodeList,
    queryEnergyCodeList,
  };
};
