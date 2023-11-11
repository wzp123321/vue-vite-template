<template>
  <view class="ecc-total">
    <text class="ecc-total-label">总能耗值(kgce)</text>
    <text class="ecc-total-label">总成本(万元)</text>
    <text class="ecc-total-value">{{ thousandSeparation(props.totalConsumptionValue) }}</text>
    <text class="ecc-total-value">{{ thousandSeparation(props.totalCostValue) }}</text>
  </view>
</template>
<script lang="ts" setup>
// 工具方法
import { thousandSeparation } from '../../../../utils';
// props
const props = defineProps({
  // 总能耗
  totalConsumptionValue: {
    type: Number,
    default: null,
  },
  // 总成本
  totalCostValue: {
    type: Number,
    default: null,
  },
});
</script>
<style lang="scss" scoped>
.ecc-total {
  display: grid;
  grid-template-columns: repeat(auto-fill, 50%);
  gap: 8rpx 0;
  margin-bottom: 48rpx;

  .ecc-total-label,
  .ecc-total-value {
    display: inline-block;
    font-size: var(--tem-font-size-b14);
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ecc-total-label {
    color: rgb(144, 147, 153);
    line-height: 44rpx;
  }

  .ecc-total-value {
    color: rgb(24, 25, 26);
    font-size: 40rpx;
    line-height: 40rpx;
    font-weight: 700;
  }
}
</style>
