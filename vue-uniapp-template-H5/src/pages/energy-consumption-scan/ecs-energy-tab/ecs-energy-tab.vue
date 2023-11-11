<template>
  <view
    :class="[
      'ecs-energy-tab',
      props.energyStickyFlag ? 'is-sticky' : '',
      !props.energyStickyFlag && props.transparentFlag ? 'is-transparent' : '',
    ]"
    :style="{ top: props.energyStickyFlag ? mapTop() : '' }"
  >
    <view
      :class="[energyCode === item.code ? 'eet-item-selected' : '', 'eet-item']"
      :style="{ height, lineHeight: height }"
      v-for="item in props.tabList"
      :key="item.code"
      @click="handleSelect(item.code)"
    >
      {{ item.name }}
    </view>
  </view>
</template>
<script lang="ts" setup>
// 公共库
import { ref } from 'vue';
import type { PropType } from 'vue';
// 接口
import type { Common_ICodeName } from '../../../api/model';
// 工具方法
import { pxToRpx } from '@/utils';
// props
const props = defineProps({
  // 能源类型列表
  tabList: {
    type: Array as PropType<Common_ICodeName<string>[]>,
    default: [],
  },
  // 是否透明
  transparentFlag: {
    type: Boolean,
    default: false,
  },
  // 当前能源类型
  selectedCode: {
    type: String,
    default: '',
  },
  // 是否吸顶
  energyStickyFlag: {
    type: Boolean,
    default: false,
  },
  // 高度
  height: {
    type: String,
    default: '96rpx',
  },
});
// emits
const emits = defineEmits(['select']);
/**
 * 吸顶高度
 * @returns {string}
 */
const mapTop = (): string => {
  return `${pxToRpx('44')}rpx`;
};
// 当前能源类型
const energyCode = ref<string>(props.selectedCode);
/**
 * 切换能源类型
 * @param {string} code
 * @returns {void}
 */
const handleSelect = (code: string): void => {
  energyCode.value = code;
  emits('select', code);
};
</script>
<style lang="scss" scoped>
.ecs-energy-tab {
  position: relative;
  opacity: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: none;
  background-color: var(--tem-color-white);

  .eet-item {
    position: relative;
    font-size: var(--tem-font-size-b16);
    color: var(--tem-text-color-primary);
    font-size: 32rpx;
    line-height: 48rpx;
    width: 150rpx;
    text-align: center;
    transition: none;

    &.eet-item-selected {
      font-weight: 600;
      color: var(--tem-color-primary);

      &::before {
        content: '';
        width: 32rpx;
        height: 6rpx;
        border-radius: 1998rpx;
        background-color: var(--tem-color-primary);

        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        transition: none;
      }
    }
  }

  &.is-transparent {
    background-color: transparent;

    .eet-item {
      color: var(--tem-color-white);

      &.eet-item-selected {
        &::before {
          background: var(--tem-color-white);
        }
      }
    }
  }

  &.is-sticky {
    position: fixed;
    left: 0;
    // top: 88rpx;
    // top: 44px;
    transition: none;
    z-index: 2;
    background-color: var(--tem-color-white);
  }
}
</style>
