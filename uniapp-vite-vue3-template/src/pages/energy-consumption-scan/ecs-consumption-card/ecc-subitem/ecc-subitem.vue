<template>
  <view class="ecc-subitem">
    <view class="ecc-subitem-item">
      <text class="ecc-subitem-item-label">占比(%)</text>
      <text class="ecc-subitem-item-value">
        {{ props.percent }}
      </text>
    </view>
    <!-- 分割线 -->
    <view class="ecc-subitem-divider"></view>
    <view class="ecc-subitem-item">
      <view class="ecc-subitem-item-row">
        <text class="ecc-subitem-item-label">总用量(kwh)</text>
        <text class="ecc-subitem-item-value">
          {{ thousandSeparation(props.totalConsumptionValue) }}
        </text>
      </view>
      <view class="ecc-subitem-item-row">
        <text class="ecc-subitem-item-label">总成本(万元)</text>
        <text class="ecc-subitem-item-value">
          {{ thousandSeparation(props.totalCostValue) }}
        </text>
      </view>
    </view>
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
  // 占比
  percent: {
    type: String,
    default: '',
  },
});
</script>
<style lang="scss" scoped>
.ecc-subitem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48rpx;

  .ecc-subitem-item {
    display: flex;
    row-gap: 8rpx;
    flex-direction: column;
    align-items: flex-start;

    .ecc-subitem-item-label,
    .ecc-subitem-item-value {
      display: inline-block;
      font-size: var(--tem-font-size-b14);
      font-family: D-DIN-DIN-Bold;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .ecc-subitem-item-label {
      color: rgb(144, 147, 153);
      line-height: 44rpx;
    }

    .ecc-subitem-item-value {
      color: rgb(24, 25, 26);
      font-size: 40rpx;
      line-height: 40rpx;
      font-weight: 700;
    }

    .ecc-subitem-item-row {
      display: flex;
      align-items: center;
      column-gap: 8rpx;
      width: 100%;

      .ecc-subitem-item-value {
        flex: auto;
        text-align: right;
      }
    }
  }

  .ecc-subitem-divider {
    width: 2rpx;
    min-width: 2rpx;
    height: 96rpx;
    background-color: var(--tem-border-color-light);
  }
}
</style>
