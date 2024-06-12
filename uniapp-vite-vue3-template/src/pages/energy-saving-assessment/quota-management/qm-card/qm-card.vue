<!--
 * @Author: yut
 * @Date: 2023-10-26 10:56:10
 * @LastEditors: yut
 * @LastEditTime: 2023-11-07 16:27:55
 * @Descripttion: 
-->
<template>
  <view class="qm-card">
    <view class="qm-card-header">
      <text>{{ name }}</text>
    </view>
    <view class="qm-card-content">
      <view
        class="qm-card-progress"
        v-for="(item, index) in energyList"
        :key="'progress' + index"
        @click="goToDetail(name, item)"
      >
        <text>{{ item.energyName }}</text>
        <progress
          :percent="item.parent"
          :font-size="14"
          :activeColor="mapStatusColor(item.status)"
          show-info
          stroke-width="12"
        />
        <text><icon-right /></text>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { IconRight } from '@arco-iconbox/vue-tem';
import { mapStatusColor } from '../utils';
import type { QM_IEnergyType } from '../quota-management.api';
const props = defineProps<{
  name: string;
  energyList: QM_IEnergyType[];
}>();

const goToDetail = (name: any, item: QM_IEnergyType) => {
  uni.navigateTo({
    url: `/pages/energy-saving-assessment/energy-saving-assessment?name=${name}&energyCode=${item.energyCode}&energyName=${item.energyName}&status=${item.status}`,
  });
};
</script>
<style lang="scss" scoped>
.qm-card {
  height: 392rpx;
  padding: 24rpx 32rpx;
  box-sizing: border-box;
  background-color: var(--tem-color-white);
  border-radius: 16rpx;
  // 卡片头部
  &-header {
    height: 48rpx;
    gap: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32rpx;

    > uni-text {
      display: flex;
      align-items: center;
      font-size: var(--tem-font-size-b16);
    }
    :deep(uni-text:nth-child(1)) {
      flex: auto;
      width: 0;
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  &-content {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
  }
  //卡片progress
  &-progress {
    height: 48rpx;
    gap: 24rpx;
    display: flex;
    align-items: center;
    > text:nth-child(1) {
      width: 116rpx;
      color: var(--tem-text-color-secondary);
      font-size: var(--tem-font-size-s12);
      text-align: right;
      flex: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    :deep(> text:nth-child(3)) {
      width: 48rpx;
      height: 48rpx;
      > span {
        width: 100%;
        height: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--tem-text-color-secondary);
      }
    }
    > .uni-progress {
      flex: auto;
    }

    :deep(.uni-progress-info) {
      font-size: var(--tem-font-size-s14);
    }
    :deep(.uni-progress-inner-bar) {
      border-radius: 24rpx;
    }
    :deep(.uni-progress-bar) {
      border-radius: 24rpx;
    }
  }
}
</style>
