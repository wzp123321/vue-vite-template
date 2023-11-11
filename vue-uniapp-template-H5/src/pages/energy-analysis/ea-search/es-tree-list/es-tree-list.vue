<template>
  <radio-group class="es-tree-list" @change="handleSelect">
    <radio
      class="etl-item"
      v-for="item in props.treeList"
      :key="item?.treeId"
      :value="item.treeId + ''"
      :checked="+item.treeId === +props.modeValue"
    >
      <view class="etl-item-middle">
        <text class="etl-item-middle-name">{{ item.treeName }}</text>
        <text class="etl-item-middle-parent" v-if="!!item.parentName">{{ item.parentName }}</text>
      </view>
      <text class="etl-item-btn" v-if="item.children?.length" @click="triggerChildrenQuery($event, item)"> 下级 </text>
    </radio>
  </radio-group>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Common_IObject, Common_ITreeVO } from '../../../../api/model';
// props
const props = defineProps({
  // 树列表
  treeList: {
    type: Array as PropType<Common_ITreeVO[]>,
    default: [],
  },
  // 选中节点
  modeValue: {
    type: Number,
    default: 0,
  },
});
// emits
const emits = defineEmits(['update:modelValue', 'drill']);
/**
 * 选择节点
 * @param event
 */
const handleSelect = (event: Common_IObject) => {
  emits('update:modelValue', (event.detail as Common_IObject).value);
};
/**
 * 查询下级节点
 * @param {Event} event
 * @param {Common_ITreeVO} item
 */
const triggerChildrenQuery = (event: Event, item: Common_ITreeVO) => {
  event.stopPropagation();
  event.preventDefault();
  console.log('查询子节点', item);

  emits('drill', item);
};
</script>
<style lang="scss" scoped>
.es-tree-list {
  background-color: var(--tem-color-white);
  display: flex;
  flex-direction: column;
  margin: 16rpx 32rpx 0;
  flex: auto;
  overflow-y: auto;

  .etl-item {
    :deep(.uni-radio-wrapper) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 40rpx 0;
      border-bottom: 2rpx solid var(--tem-border-color-light);

      .uni-radio-input {
        width: 48rpx;
        min-width: 48rpx;
        height: 48rpx;
        margin-right: 16rpx;
      }
    }

    .etl-item-middle {
      display: flex;
      flex-direction: column;
      flex: auto;
      overflow: hidden;

      text {
        display: inline-block;
      }

      .etl-item-middle-name {
        color: rgb(48, 49, 51);
        font-size: 32rpx;
        line-height: 48rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .etl-item-middle-parent {
        color: var(--tem-text-color-placeholder);
        font-size: 24rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /*行数*/
      }
    }

    .etl-item-btn {
      position: relative;
      white-space: nowrap;
      color: var(--tem-color-primary);
      font-size: 32rpx;
      padding-left: 32rpx;
      margin-left: 32rpx;

      &::after {
        content: '';
        width: 2rpx;
        height: 32rpx;
        background-color: var(--tem-border-color-light);
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
