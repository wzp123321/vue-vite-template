<template>
  <view class="es-select-crumbs">
    <icon-home-filled @click="handleItemClick()" />
    <icon-right />
    <view
      v-for="(item, index) in props.list"
      :key="item.treeId"
      :class="['es-select-crumbs-item', mapHighLighter(index) ? 'es-select-crumbs-active' : '']"
    >
      <text @click="handleItemClick(item)">{{ item.treeName }}</text>
      <icon-right />
    </view>
  </view>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue';
// 组件
import { IconRight, IconHomeFilled } from '@arco-iconbox/vue-tem';
import type { Common_ITreeVO } from '@/api/model';
// props
const props = defineProps({
  list: {
    type: Array as PropType<Common_ITreeVO[]>,
    default: [''],
  },
});
/**
 * 高亮
 */
const mapHighLighter = (index: number) => {
  return index === 0 || index !== props.list.length - 1;
};

// emits
const emits = defineEmits(['select']);
/**
 * 选择节点
 * @param {Common_ITreeVO} item
 */
const handleItemClick = (item?: Common_ITreeVO) => {
  emits('select', item);
};
</script>
<style lang="scss" scoped>
.es-select-crumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 24rpx 32rpx 16rpx;
  font-size: var(--tem-font-size-b14);
  gap: 16rpx 24rpx;
  border-bottom: 1rpx solid var(--tem-border-color-light);

  > svg {
    color: var(--tem-color-primary);
  }

  .es-select-crumbs-item {
    display: flex;
    align-items: center;
    gap: 24rpx;
    color: var(--tem-text-color-regular);
  }

  .es-select-crumbs-active {
    color: var(--tem-color-primary);
  }

  svg {
    width: 32rpx;
    height: 32rpx;
  }

  .temicon--icon.temicon--icon-right {
    width: 24rpx;
    height: 24rpx;
    color: var(--tem-text-color-placeholder);
  }
}
</style>
