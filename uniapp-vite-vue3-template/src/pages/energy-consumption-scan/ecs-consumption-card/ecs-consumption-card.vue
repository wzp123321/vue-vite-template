<template>
  <view :class="['ecs-consumption-card', props.energyStickyFlag || !props.topLevelFlag ? 'is-sticky' : '']">
    <view class="ecc-container">
      <!-- 总能耗 -->
      <ecc-total
        v-if="!mapIsSubentry()"
        :totalConsumptionValue="props.consumptionData?.totalConsumptionValue as number"
        :totalCostValue="(props.consumptionData?.totalCostValue as number)"
      ></ecc-total>
      <!-- 分项 -->
      <ecc-subitem
        :totalConsumptionValue="props.consumptionData?.totalConsumptionValue as number"
        :totalCostValue="props.consumptionData?.totalCostValue as number"
        :percent="props.consumptionData?.percent"
        v-else
      ></ecc-subitem>
      <!-- 图表 -->
      <view class="ecc-container-charts" v-if="props.consumptionData.totalConsumptionValue !== null">
        <qiun-data-charts type="pie" :opts="options" :chartData="chartData" :ontouch="false" :ontap="false" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 公共库
import { onLoad } from '@dcloudio/uni-app';
import type { PropType } from 'vue';
import { reactive } from 'vue';
// api
import type { Ecs_IConsumptionData } from '../energy-consumption-scan.api';
// 配置
import { CHARTS_COLOR_GROUP, mapEnergyColorByCode } from '@/config/config';
import { Common_EEnergyCode } from '@/config/enum';
// 组件
import EccTotal from './ecc-total/ecc-total.vue';
import EccSubitem from './ecc-subitem/ecc-subitem.vue';
// props
const props = defineProps({
  // 能源类型
  energyCode: {
    type: String,
    default: '00000',
  },
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
  // 如果是非顶级节点
  topLevelFlag: {
    type: Boolean,
    default: false,
  },
});

/**
 * 是否是分项
 * @returns {boolean}
 */
const mapIsSubentry = (): boolean => {
  return props.energyCode !== Common_EEnergyCode.总能耗;
};
// 数据源
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
    (props.consumptionData.pieData?.map((item, index) => {
      return props.energyCode === Common_EEnergyCode.总能耗
        ? mapEnergyColorByCode(item.id)
        : CHARTS_COLOR_GROUP[index % CHARTS_COLOR_GROUP.length];
    }) as any) ?? [];
};
/**
 * 生成series数据
 */
const mapSeriesData = () => {
  return (
    props.consumptionData.pieData?.map((item) => ({
      name: item.name,
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
  padding: 16rpx 32rpx 32rpx;
  box-sizing: border-box;

  .ecc-container {
    border-radius: 16rpx;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.23) 0%, rgba(255, 255, 255, 1) 100%);
    box-shadow: 8rpx 0px 40rpx rgba(0, 0, 0, 0.03);
    backdrop-filter: blur(100rpx);
    overflow: hidden;
    box-sizing: border-box;

    transition: all 233ms;
    padding: 32rpx;

    .ecc-container-charts {
      width: 100%;
      height: 416rpx;
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
