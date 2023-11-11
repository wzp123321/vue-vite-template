<template>
  <view class="common-date-picker">
    <uni-dateformat :date="props.date" :format="props.mode" @click="open"></uni-dateformat>
    <uni-popup ref="popupRef" type="bottom">
      <!-- <view class="cdp-popup"> -->
      <!-- 头部 -->
      <view class="cdp-popup-header">
        <text class="cdp-popup-header-cancel">取消</text>
        <text class="cdp-popup-header-title">选择日期</text>
        <text class="cdp-popup-header-submit">确定</text>
      </view>
      <picker-view class="cdp-popup-body" :value="selectedValue" @change="handleChange">
        <!-- 年 -->
        <picker-view-column>
          <view
            :class="['cdp-popup-body-item', item === selectedValue?.[0] ? 'is-selected' : '']"
            v-for="item in years"
            :key="item"
          >
            {{ item }}
          </view>
        </picker-view-column>
        <!-- 月 -->
        <picker-view-column>
          <view
            :class="['cdp-popup-body-item', item === selectedValue?.[1] ? 'is-selected' : '']"
            v-for="item in months"
            :key="item"
          >
            {{ mapMonth(item) }}
          </view>
        </picker-view-column>
        <!-- 日 -->
        <picker-view-column>
          <view
            :class="['cdp-popup-body-item', item === selectedValue?.[2] ? 'is-selected' : '']"
            v-for="item in days"
            :key="item"
          >
            {{ mapMonth(item) }}
          </view>
        </picker-view-column>
      </picker-view>
      <!-- </view> -->
    </uni-popup>
  </view>
</template>
<script lang="ts" setup>
// 枚举
import { Common_EPickerType } from '../../config/enum';
import { ref } from 'vue';
const props = defineProps({
  // 日期
  date: {
    type: String,
    default: '',
  },
  // 类型
  mode: {
    type: String,
    default: Common_EPickerType.年月,
  },
  // 开始年
  startYear: {
    type: Number,
    default: 1970,
  },
  // 结束年
  endYear: {
    type: Number,
    default: new Date().getFullYear(),
  },
});

// 年列表
const years = ref<number[]>([]);
// 月
const months = ref<number[]>([]);
// 日期
const days = ref<number[]>([]);
// 当前年
const selectedValue = ref<number[]>([]);
/**
 * 初始化天数
 */
const initDates = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  for (let i = 1990; i <= date.getFullYear(); i++) {
    years.value.push(i);
  }
  for (let i = 1; i <= 12; i++) {
    months.value.push(i);
  }
  for (let i = 1; i <= 31; i++) {
    days.value.push(i);
  }

  const y = new Date(props.date).getFullYear();
  selectedValue.value = [years.value.findIndex((item) => y === item), month - 1, day - 1];
};
initDates();

/**
 * 格式化月
 */
const mapMonth = (m: number) => {
  return m > 9 ? m : `0${m}`;
};

// 弹出框
const popupRef = ref();
/**
 * 打开
 */
const open = () => {
  popupRef.value && popupRef.value?.open('bottom');
};

/**
 * 切换
 * @param value
 */
const handleChange = (event: any) => {
  selectedValue.value = event.detail.value;
};
</script>
<style lang="scss" scoped>
.common-date-picker {
  :deep(.uni-popup__wrapper.bottom) {
    height: 580rpx;
    background-color: var(--tem-color-white) !important;
    border-radius: 16rpx 16rpx 0 0;
    display: flex;
    flex-direction: column;

    .cdp-popup-header {
      padding: 32rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .cdp-popup-header-cancel,
      .cdp-popup-header-submit {
        font-size: var(--tem-font-size-b14);
        color: var(--tem-text-color-regular);
      }

      .cdp-popup-header-submit {
        color: var(--tem-color-primary);
      }

      .cdp-popup-header-title {
        color: var(--tem-text-color-primary);
        font-size: var(--tem-font-size-h18);
        font-weight: 600;
        line-height: 52rpx;
      }
    }

    .cdp-popup-body {
      height: 400rpx;
      padding: 48rpx 32rpx 0;
      box-sizing: border-box;

      .uni-picker-view-wrapper {
        .uni-picker-view-content {
          // padding-top: 0 !important;

          .cdp-popup-body-item {
            text-align: center;
            height: 80rpx;
            line-height: 80rpx;
          }

          .cdp-popup-body-item.is-selected {
            background-color: rgba(245, 247, 250, 1);
            color: rgb(48, 49, 51);
          }
        }
      }
    }
  }
}
</style>
