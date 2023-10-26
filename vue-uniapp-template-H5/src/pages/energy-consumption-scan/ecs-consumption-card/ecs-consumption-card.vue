<template>
  <view :class="['ecs-consumption-card', props.energyStickyFlag ? 'is-sticky' : '']">
    <view class="ecc-container">
      <!-- 数据 -->
      <view class="ecc-container-header">
        <text class="ecc-container-header-label">总能耗值(kgce)</text>
        <text class="ecc-container-header-label">总成本(万元)</text>
        <text class="ecc-container-header-value">{{
          thousandSeparation(props.consumptionData.totalConsumptionValue)
        }}</text>
        <text class="ecc-container-header-value">{{ thousandSeparation(props.consumptionData.totalCostValue) }}</text>
      </view>
      <!-- 图表 -->
      <view class="ecc-container-charts">
        <qiun-data-charts type="pie" :opts="options" :chartData="chartData" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 公共库
import { onLoad } from '@dcloudio/uni-app';
import type { PropType } from 'vue';
import { reactive } from 'vue';
// 工具方法
import { thousandSeparation } from '@/utils';
import type { Ecs_IConsumptionData } from '../energy-consumption-scan.api';
import { mapEnergyColorByCode } from '@/config/config';
// props
const props = defineProps({
  // 数据
  consumptionData: {
    type: Object as PropType<Ecs_IConsumptionData>,
    default: {},
  },
  // 是否吸顶
  energyStickyFlag: {
    type: Boolean,
    default: false,
  },
});

const chartData = reactive<any>({ series: [] });
// 配置
const options = reactive({
  color: [],
  padding: [5, 5, 5, 5],
  enableScroll: false,
  extra: {
    pie: {
      activeOpacity: 0.5,
      activeRadius: 10,
      offsetAngle: 0,
      labelWidth: 15,
      border: true,
      borderWidth: 1, // 分割线的宽度
      borderColor: '#FFFFFF',
    },
  },
  legend: {
    // 图例
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 16,
    fontColor: 'rgb(48, 49, 51)',
  },
});
/**
 *
 */
const getServerData = () => {
  chartData.series = [
    {
      data: mapSeriesData(),
    },
  ];
};
/**
 * 生成配置
 */
const mapOptions = () => {
  options.color =
    (props.consumptionData.energyDataList?.map((item) => mapEnergyColorByCode(item.energyCode)) as any) ?? [];
};
/**
 * 生成series数据
 */
const mapSeriesData = () => {
  return (
    props.consumptionData.energyDataList?.map((item) => ({
      name: item.energyName,
      value: item.value,
      legendShape: 'rect',
    })) ?? []
  );
};
onLoad(() => {
  mapOptions();
  getServerData();
});
</script>

<style lang="scss" scoped>
.ecs-consumption-card {
  width: 100%;
  height: 334px;
  padding: 8px 16px 16px;
  box-sizing: border-box;

  .ecc-container {
    border-radius: 8px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.23) 0%, rgba(255, 255, 255, 1) 100%);
    box-shadow: 4px 0px 20px rgba(0, 0, 0, 0.03);
    backdrop-filter: blur(50px);
    overflow: hidden;
    box-sizing: border-box;

    transition: all 233ms;
    padding: 16px;

    .ecc-container-header {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 4px 12px;
      margin-bottom: 24px;

      .ecc-container-header-label,
      .ecc-container-header-value {
        display: inline-block;
        font-size: var(--tem-font-size-b14);
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .ecc-container-header-label {
        color: rgb(144, 147, 153);
        line-height: 22px;
      }

      .ecc-container-header-value {
        color: rgb(24, 25, 26);
        font-size: 20px;
        line-height: 20px;
        font-weight: 700;
      }
    }

    .ecc-container-charts {
      width: 100%;
      height: 208px;
      overflow: hidden;
    }
  }

  &.is-sticky .ecc-container {
    opacity: 1;
    background-color: var(--tem-color-white);
    transition: all 233ms;
  }
}
</style>
