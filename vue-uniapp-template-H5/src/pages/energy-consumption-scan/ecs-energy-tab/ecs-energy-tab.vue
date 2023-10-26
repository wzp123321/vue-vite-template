<template>
  <div
    :class="['ecs-energy-tab', props.energyStickyFlag ? 'is-sticky' : '']"
    :style="{ backgroundColor: props.navigatorStyle.backgroundColor }"
  >
    <view
      :class="[energyCode === item.code ? 'eet-item-selected' : '', 'eet-item']"
      v-for="item in props.tabList"
      :key="item.code"
      :style="{ color: props.navigatorStyle.color }"
      @click="handleSelect(item.code)"
    >
      {{ item.name }}
    </view>
  </div>
</template>
<script lang="ts" setup>
// 公共库
import { ref } from 'vue';
import type { PropType } from 'vue';
// 接口
import type { Common_ICodeName } from '../../../api/model';
import type { Ecs_INavigatorStyle } from '../energy-consumption-scan.api';
// props
const props = defineProps({
  // 能源类型列表
  tabList: {
    type: Array as PropType<Common_ICodeName<string>[]>,
    default: [],
  },
  // 动态样式
  navigatorStyle: {
    type: Object as PropType<Ecs_INavigatorStyle>,
    default: {
      backgroundColor: 'transparent',
      color: 'var(--tem-color-white)',
    },
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
});
// emits
const emits = defineEmits(['select']);
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
  width: 100%;
  opacity: 1;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: none;

  .eet-item {
    position: relative;
    font-size: var(--tem-font-size-b16);
    color: var(--tem-color-white);
    padding: 12px 0;
    font-size: 16px;
    line-height: 24px;
    width: 75px;
    text-align: center;
    transition: none;

    &.eet-item-selected {
      font-weight: 600;

      &::before {
        content: '';
        width: 16px;
        height: 3px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 1);

        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        transition: none;
      }
    }
  }

  &.is-sticky {
    position: fixed;
    left: 0;
    top: 44px;
    transition: none;
    z-index: 2;

    .eet-item.eet-item-selected {
      color: var(--tem-color-primary) !important;

      &::before {
        background-color: var(--tem-color-primary);
      }
    }
  }
}
</style>
