<template>
  <view :class="['etd-tree-date', props.transparentFlag ? 'is-transparent' : '']">
    <!-- 节点 -->
    <view class="etd-panel-tree-node" @click="handlePageToDetail('223')">
      <text>{{ props?.topPanelForm?.treeName }}</text>
      <icon-down />
    </view>
    <!-- 日期 -->
    <!-- <tem-dateTimePicker
      mode="date"
      :value="props?.topPanelForm?.date"
      fields="month"
      @change="handleDateChange"
      :end="getCurrentDateStr()"
    >
      <view class="etd-panel-tree-center">
        <text>{{ props?.topPanelForm?.date }}</text>
        <IconCalendar></IconCalendar>
      </view>
      <template #headerTitle>
        <text>选择日期</text>
      </template>
    </tem-dateTimePicker> -->
  </view>
</template>
<script lang="ts" setup>
// 公共库
import type { PropType } from 'vue';
// 接口
import type { Ecs_ITopPanelForm } from '../energy-consumption-scan.api';
import type { Common_IObject } from '../../../api/model';
// 组件
import { IconDown, IconCalendar } from '@arco-iconbox/vue-tem';
import { handlePageTo, getCurrentDateStr } from '@/utils';

// props
const props = defineProps({
  // 表单
  topPanelForm: {
    type: Object as PropType<Ecs_ITopPanelForm>,
  },
  // 动态样式
  transparentFlag: {
    type: Boolean,
    default: false,
  },
});
// emits
const emits = defineEmits(['date-change']);
/**
 * 跳转详情页面
 * @param {string} treeId
 */
const handlePageToDetail = (treeId: string = '3333') => {
  handlePageTo('/pages/energy-analysis/energy-analysis', { treeId });
};
/**
 * 切换日期
 * @param {Common_IObject} event
 * @returns {void}
 */
const handleDateChange = (event: Common_IObject): void => {
  emits('date-change', (event.detail as Common_IObject).value + '' ?? '');
};
</script>
<style lang="scss" scoped>
.etd-tree-date {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 32rpx 16rpx;
  color: var(--tem-text-color-primary);
  background-color: var(--tem-color-white);

  &.is-transparent {
    background-color: transparent;
    color: var(--tem-color-white);
  }

  svg {
    width: 32rpx;
    height: 32rpx;
  }

  .etd-panel-tree-node,
  .etd-panel-tree-date {
    display: flex;
    align-items: center;
    gap: 16rpx;
  }

  .etd-panel-tree-node {
    font-weight: 600;
    font-size: 40rpx;
    line-height: 56rpx;
  }

  .etd-panel-tree-center {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    gap: 12rpx;
  }
}
</style>
