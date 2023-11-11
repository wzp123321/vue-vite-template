<template>
  <view class="ea-scan">
    <view class="es-count">{{ thousandSeparation(props.total) }}</view>
    <view :class="['es-card es-month', mapColorClass(props.monthAndMonthRate)]">
      <text class="es-card-title">同比</text>
      <IconTop v-if="props.monthAndMonthRate > 0"></IconTop>
      <IconBottom v-if="props.monthAndMonthRate < 0"></IconBottom>
      <text>{{ mapValueLabel(props.monthAndMonthRate) }}</text>
    </view>
    <view :class="['es-card es-year', mapColorClass(props.yearAndYearRate)]">
      <text class="es-card-title">环比</text>
      <IconTop v-if="props.yearAndYearRate > 0"></IconTop>
      <IconBottom v-if="props.yearAndYearRate < 0"></IconBottom>
      <text>{{ mapValueLabel(props.yearAndYearRate) }}</text>
    </view>
  </view>
</template>
<script lang="ts" setup>
// 工具方法
import { thousandSeparation, floatMultiply } from '../../../utils/index';
// 组件
import { IconTop, IconBottom } from '@arco-iconbox/vue-tem';
// props
const props = defineProps({
  // 能耗量
  total: {
    type: Number || null,
    default: 0,
  },
  // 同比
  monthAndMonthRate: {
    type: Number || null,
    default: null,
  },
  // 环比
  yearAndYearRate: {
    type: Number || null,
    default: 0.007,
  },
});
/**
 * 数据高亮
 * @param value
 */
const mapColorClass = (value: number) => {
  return value > 0 ? 'positive' : value < 0 ? 'negative' : '';
};
/**
 * 数据文本
 * @param value
 */
const mapValueLabel = (value: number) => {
  return value ===null || isNaN(value) ? '-' : `${floatMultiply(value, 100)}%`;
};
</script>
<style lang="scss" scoped>
.ea-scan {
  background-color: var(--tem-color-white);
  padding: 48rpx 48rpx 32rpx;
  row-gap: 48rpx;
  column-gap: 16rpx;
  display: grid;
  grid-template-columns: auto auto;
  grid-auto-rows: minmax(76rpx, auto);

  .es-count {
    text-align: center;
    color: var(--tem-text-color-primary);
    font-size: var(--tem-font-size-oh32);
    font-weight: 700;
    height: 80rpx;
    line-height: 64rpx;
    overflow: hidden;
    text-overflow: ellipsis;

    grid-column: 1/3;
  }

  .es-card {
    padding: 16rpx 0;
    background-color: var(--tem-fill-color);
    font-size: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8rpx;

    &.positive {
      color: var(--tem-color-danger);
    }

    &.negative {
      color: var(--tem-color-success);
    }

    .es-card-title {
      color: var(--tem-text-color-secondary);
      margin-right: 8rpx;
    }
  }
}
</style>
