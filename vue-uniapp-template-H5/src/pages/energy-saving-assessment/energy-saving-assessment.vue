<!--
 * @Author: yut
 * @Date: 2023-10-26 19:20:14
 * @LastEditors: yut
 * @LastEditTime: 2023-11-07 16:23:51
 * @Descripttion: 
-->
<!--
 * @Author: yut
 * @Date: 2023-10-23 16:52:37
 * @LastEditors: yut
 * @LastEditTime: 2023-10-27 10:09:43
 * @Descripttion: 
-->
<template>
  <view class="energy-saving-assessment">
    <view
      class="esa-container"
      :style="{
        'background-image': esaService.mapBackgroundImageByEnergyCode(detailData.status).bgImage ?? '',
      }"
    >
      <!-- 状态栏 -->
      <view class="esa-status-bar" style="height: 48rpx; background-color: transparent"> </view>
      <!-- 顶部导航栏 -->
      <common-navigation-bar
        :nativeFlag="false"
        title="节能考核"
        :statusBar="true"
        :backgroundColor="navigatorStyle.backgroundColor"
        :color="navigatorStyle.color"
      >
        <template #right>
          <text class="esa-filter" @click="filter"><icon-filter /></text>
        </template>
      </common-navigation-bar>
      <!-- 头部栏 -->
      <view class="esa-header">
        <view class="esa-header-left">
          <text>{{ detailData.name }}</text>
          <text>(本院/门诊楼/门诊楼1F)</text>
        </view>
        <view
          class="esa-header-right"
          :style="{
            'background-image': esaService.mapBackgroundImageByEnergyCode(detailData.status).tabImage ?? '',
          }"
        ></view>
      </view>
      <!-- 内容区域 -->
      <view class="esa-content">
        <view class="esa-content-chart">
          <view>
            <view class="esa-content-chart-item">
              <text>电(kWh)</text>
              <text>931,132</text>
            </view>
            <view class="esa-content-chart-picker">
              <view @click="showDatePopup">
                <view>{{ esaService.date }}</view>
                <view class="esa-content-chart-picker-icon"><icon-down /></view>
              </view>
            </view>
          </view>
          <!-- 图表区域 -->
          <view>
            <qiun-data-charts type="arcbar" :opts="opts" :chartData="chartData" />
          </view>
        </view>
        <!-- 列表区域 -->
        <view class="esa-content-list">
          <view
            class="esa-content-list-header"
            :style="{
              'background-image': esaService.mapBackgroundImageByEnergyCode(detailData.status).headImage ?? '',
            }"
          >
            <text :style="tipTxtStyle.colorStyle">{{ tipTxtStyle.str }}</text>
          </view>
          <view class="esa-content-list-container">
            <view class="esa-content-list-item" v-for="(item, index) in esaService.detailList" :key="'item' + index">
              <text>{{ item.itemName }}</text>
              <text>{{ thousandSeparation(item.value) }}</text>
            </view>
          </view>
        </view>
      </view>
      <view>
        <!-- 普通弹窗 -->
        <uni-popup ref="popupRef" type="bottom">
          <view class="esa-popup">
            <view class="esa-popup-header">
              <text>日期范围</text>
              <icon-close class="esa-close" @click="closePopup" />
            </view>
            <view class="esa-popup-radio">
              <text>维度</text>
              <view>
                <radio-group @change="radioChange">
                  <label class="radio"
                    ><radio value="month" :checked="esaService.fieldType === ESA_EFieldType.本月" />本月</label
                  >
                  <label class="radio"
                    ><radio value="year" :checked="esaService.fieldType === ESA_EFieldType.本年" />本年</label
                  >
                </radio-group>
              </view>
            </view>
            <view class="esa-popup-date">
              <text>选择日期</text>
              <!-- <picker
                mode="date"
                :fields="esaService.fieldType"
                :value="date"
                :start="startDate"
                :end="endDate"
                @change="bindDateChange"
              >
                <view>{{ date }}</view>
                <view class="esa-popup-icon"><icon-right /></view>
              </picker> -->
              <!-- <tem-dateTimePicker mode="date" :value="date" :fields="esaService.fieldType" @change="bindDateChange">
                <view class="ea-panel-bottom-center">
                  <text>{{ date }}</text>
                  <IconDown></IconDown>
                </view>
                <template #headerTitle>
                  <text>选择日期</text>
                </template>
              </tem-dateTimePicker> -->
            </view>
            <view class="esa-popup-btn">
              <text @click="reset">重置</text>
              <text @click="confirm">确定</text>
            </view>
          </view>
        </uni-popup>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import esaService from './energy-saving-assessment.service';
import { ESA_EFieldType, ESA_EStatus, type ESA_INavigatorStyle } from './energy-saving-assessment.api';
import { IconFilter, IconDown, IconClose, IconRight } from '@arco-iconbox/vue-tem';
import { onLoad } from '@dcloudio/uni-app';
import { thousandSeparation } from '@/utils';
import { mapStatusColor } from './quota-management/utils';

const navigatorStyle = reactive<ESA_INavigatorStyle>({
  backgroundColor: 'transparent',
  color: 'var(--tem-color-white)',
});
const detailData = reactive<{
  status: ESA_EStatus;
  name: string;
}>({
  status: ESA_EStatus.盈余,
  name: '',
});
onLoad((options) => {
  detailData.status = options?.status;
  detailData.name = options?.name;
  console.log('onLoad------------', options);
});

/**
 * 跳转到过滤页面
 */
const filter = () => {
  uni.navigateTo({
    url: `/pages/energy-saving-assessment/esa-filter/esa-filter`,
  });
};

onMounted(() => {
  getServerData();
});

const opts = reactive({
  title: {
    name: '80%',
    fontSize: 32,
    color: '#303133',
  },
  subtitle: {
    name: '定额使用情况',
    fontSize: 16,
    color: '#909399',
  },
  extra: {
    arcbar: {
      type: 'default',
      width: 12,
      backgroundColor: '#e6e8eb',
      gap: 2,
    },
  },
});
const chartData = ref<any>();
const getServerData = () => {
  //模拟从服务器获取数据时的延时
  setTimeout(() => {
    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    let res = {
      series: [
        {
          name: '正确率',
          color: mapStatusColor(detailData.status),
          data: 0.8,
        },
      ],
    };
    chartData.value = JSON.parse(JSON.stringify(res));
  }, 500);
};

/**
 * 开始时间
 */
const startDate = computed(() => esaService.getDate('start'));

//结束时间
const endDate = computed(() => esaService.getDate('end'));

const date = ref(esaService.getDate());

/**
 * 确定时间
 * @param e
 */
const bindDateChange = (e: any) => {
  console.log('%c🚀 ~ energy-saving-assessment.vue ~ 187行', 'font-size: 116rpx', e.detail.value);
  date.value = e.detail.value;
};

const popupRef = ref();

/**
 * 打开弹出层
 */
const showDatePopup = () => {
  console.log('%c🚀 ~ energy-saving-assessment.vue ~ 156行', 'font-size: 116rpx', popupRef.value);
  popupRef.value?.open();
};

/**
 * 关闭弹出层
 */
const closePopup = () => {
  popupRef.value?.close();
};

/**
 * 确定
 */
const confirm = () => {
  esaService.date = date.value;
  popupRef.value?.close();
};

/**
 * 重置
 */
const reset = () => {
  esaService.fieldType = ESA_EFieldType.本月;
  date.value = esaService.getDate();
};
/**
 *维度变化
 * @param evt
 */
const radioChange = (evt: any) => {
  esaService.fieldType = evt.detail.value;
  if (esaService.fieldType === ESA_EFieldType.本年) {
    date.value = new Date().getFullYear().toString();
  } else {
    date.value = esaService.getDate();
  }
};

/**
 * 根据状态显示对应的提示语
 */
const tipTxtStyle = computed(() => {
  let str,
    color = '';
  switch (detailData.status) {
    case ESA_EStatus.盈余:
      str = '能源使用速率正常，请保持!';
      color = 'var(--tem-color-success)';
      break;
    case ESA_EStatus.警告:
      str = `已超过能源定额消耗速率，
  预计月底将超出本月KPI定额值，请关注!`;
      color = 'var(--tem-color-warning)';
      break;
    case ESA_EStatus.超支:
      str = '能源使用速率异常，超出定额！';
      color = 'var(--tem-color-danger)';
      break;
    default:
      break;
  }
  return {
    str,
    colorStyle: {
      color: color,
    },
  };
});
</script>
<style lang="scss" scoped>
.energy-saving-assessment {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f2f3f5;

  :deep(.uni-navbar__header) {
    background-color: transparent !important;
  }
  :deep(.uni-navbar__content) {
    background-color: transparent !important;
  }

  .esa-container {
    position: relative;
    flex: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-size: contain;
    background-position: top center;
    background-repeat: no-repeat;
    transition: none;
  }

  :deep(.esa-filter) {
    width: 48rpx;
    height: 48rpx;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    span {
      width: 100%;
      height: 100%;
      font-size: 48rpx;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
  //头部
  .esa-header {
    height: 156rpx;
    padding: 24rpx 32rpx 16rpx;
    flex: none;
    display: flex;
    gap: 20rpx;
    align-items: center;
    box-sizing: border-box;
    &-left {
      height: 100%;
      flex: auto;
      width: 0;
      display: flex;
      flex-direction: column;
      gap: 16rpx;
      color: var(--tem-color-white);
      uni-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      uni-text:nth-child(1) {
        height: 56rpx;
        line-height: 56rpx;
        font-size: var(--tem-font-size-h20);
        font-weight: 600;
      }
      uni-text:nth-child(2) {
        height: 44rpx;
        line-height: 44rpx;
        font-size: var(--tem-font-size-b14);
        opacity: 0.8;
      }
    }
    &-right {
      height: 108rpx;
      width: 128rpx;
      margin-right: 20rpx;
      background-repeat: no-repeat;
      background-size: 100%;
      flex: none;
    }
  }
  // 内容区域
  .esa-content {
    flex: auto;
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    padding: 16rpx 32rpx;
    // 图表区域
    &-chart {
      height: 564rpx;
      border-radius: 16rpx;
      display: flex;
      flex-direction: column;
      // backdrop-filter: blur(100rpx);
      box-sizing: border-box;
      background: linear-gradient(180deg, #ffffff33 0%, #ffffff80 50.52%, #ffffff 100%);
      box-shadow: 8rpx 0px 40rpx #00000008;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      > uni-view:nth-child(1) {
        height: 100rpx;
        box-sizing: border-box;
        flex: none;
        display: flex;
        gap: 20rpx;
      }
      > uni-view:nth-child(2) {
        flex: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 416rpx;
      }
      &-item {
        display: flex;
        flex-direction: column;
        flex: auto;
        width: 0;
        gap: 8rpx;
        uni-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        > uni-text:nth-child(1) {
          display: inline-block;
          height: 44rpx;
          line-height: 44rpx;
          color: var(--tem-text-color-regular);
          font-size: var(--tem-font-size-b14);
        }
        > uni-text:nth-child(2) {
          display: inline-block;
          height: 48rpx;
          line-height: 48rpx;
          color: var(--tem-text-color-primary);
          font-size: var(--tem-font-size-oh24);
          font-family: D-DIN;
        }
      }
      &-picker {
        font-size: 28rpx;
        flex: none;
        position: relative;
        > uni-view {
          display: flex;
          align-items: center;
          gap: 16rpx;
        }
      }
    }
    // 列表区域
    &-list {
      height: 592rpx;
      border-radius: 16rpx;
      background-color: var(--tem-bg-color);
      display: flex;
      flex-direction: column;
      &-header {
        height: 144rpx;
        flex: none;
        padding-left: 32rpx;
        background-repeat: no-repeat;
        background-size: 100%;
        :deep(> text) {
          display: inline-flex;
          font-size: var(--tem-font-size-b14);
          height: 48rpx;
          width: 80%;
          align-items: center;
          margin: 36rpx 0 20rpx 0;
          color: var(--tem-color-success);
        }
      }
      &-container {
        display: flex;
        flex-direction: column;
        flex: auto;
      }
      &-item {
        flex: 1;
        padding: 0 32rpx;
        border-bottom: 1rpx solid var(--tem-border-color-light);
        display: flex;
        align-items: center;
        justify-content: space-between;
        > uni-text {
          color: var(--tem-text-color-regular);
          font-size: var(--tem-font-size-b16);
        }
      }
    }
  }

  //弹出层
  .esa-popup {
    border-radius: 24rpx 24rpx 0px 0px;
    background: var(--tem-bg-color);
    padding: 0 32rpx;
    &-header {
      height: 116rpx;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      uni-text {
        padding: 32rpx 0;
        height: 52rpx;
        font-weight: 600;
        font-size: var(--tem-font-size-h18);
        display: inline-flex;
        align-items: center;
      }
      .esa-close {
        height: 48rpx;
        width: 48rpx;
        position: absolute;
        right: 0;
      }
    }
    &-radio,
    &-date {
      height: 112rpx;
      font-size: var(--tem-font-size-b16);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2rpx solid var(--tem-border-color-light);
      uni-radio-group {
        display: flex;
        gap: 48rpx;
      }
      :deep(.uni-radio-input) {
        width: 40rpx;
        height: 40rpx;
      }
      :deep(.radio) {
        display: flex;
        align-items: center;
      }
    }
    &-date {
      :deep(uni-picker > div:last-child) {
        display: flex;
        align-items: center;
        uni-view:nth-child(1) {
          font-size: var(--tem-font-size-b16);
        }
      }
      .esa-popup-icon {
        width: 48rpx;
        height: 48rpx;
        font-size: 48rpx;
        display: flex;
        align-items: center;
      }
    }
    &-btn {
      height: 160rpx;
      gap: 32rpx;
      padding: 32rpx 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > uni-text {
        flex: 1;
        height: 100%;
        font-weight: 600;
        border-radius: 8rpx;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: var(--tem-font-size-b16);
      }
      > uni-text:nth-child(1) {
        color: var(--tem-text-color-regular);
        border: 2rpx solid var(--tem-border-color);
      }
      > uni-text:nth-child(2) {
        background-color: var(--tem-color-primary);
        color: var(--tem-color-white);
      }
    }
  }
}
</style>
