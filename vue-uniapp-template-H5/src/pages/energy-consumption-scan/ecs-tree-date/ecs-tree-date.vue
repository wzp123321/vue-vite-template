<template>
  <view
    class="etd-tree-date"
    :style="{ backgroundColor: props.navigatorStyle.backgroundColor, color: props.navigatorStyle.color }"
  >
    <!-- 节点 -->
    <view class="etd-panel-tree-node" @click="handlePageToDetail('223')">
      <text>{{ props?.filterForm?.treeName }}</text>
      <icon-down />
    </view>
    <!-- 日期 -->
    <picker mode="date" :value="props?.filterForm?.date" fields="month" @change="handleDateChange">
      <view class="etd-panel-tree-date">
        <text>{{ props?.filterForm?.date }}</text>
        <icon-calendar />
      </view>
    </picker>
  </view>
</template>
<script lang="ts" setup>
// 公共库
import type { PropType } from 'vue';
// 接口
import type { Ecs_IFilterForm, Ecs_INavigatorStyle } from '../energy-consumption-scan.api';
import type { Common_IObject } from '../../../api/model';
// 组件
import { IconDown, IconCalendar } from '@arco-iconbox/vue-tem';

// props
const props = defineProps({
  // 表单
  filterForm: {
    type: Object as PropType<Ecs_IFilterForm>,
  },
  // 动态样式
  navigatorStyle: {
    type: Object as PropType<Ecs_INavigatorStyle>,
    default: {
      backgroundColor: 'transparent',
      color: 'var(--tem-color-white)',
    },
  },
});
// emits
const emits = defineEmits(['date-change']);
/**
 * 跳转详情页面
 * @param {string} treeId
 */
const handlePageToDetail = (treeId: string = '3333') => {
  uni.navigateTo({
    url: `/pages/energy-analysis/energy-analysis?id=${treeId}`,
  });
};
/**
 * 切换日期
 * @param {Common_IObject} event
 */
const handleDateChange = (event: Common_IObject) => {
  emits('date-change', (event.detail as Common_IObject).value + '' ?? '');
};
</script>
<style lang="less" scoped>
.etd-tree-date {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px 8px;
  color: var(--tem-color-white);

  svg {
    width: 16px;
    height: 16px;
  }

  .etd-panel-tree-node,
  .etd-panel-tree-date {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .etd-panel-tree-node {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
  }

  .etd-panel-tree-date {
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
