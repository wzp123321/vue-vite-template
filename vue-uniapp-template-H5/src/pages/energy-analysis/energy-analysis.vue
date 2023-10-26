<template>
  <view class="energy-analysis">
    <view
      class="ea-panel"
      :style="{
        'background-image': mapEnergyAnalysisBgImage(panelForm.energyCode),
      }"
    >
      <view class="ecs-status-bar" style="height: 44px; background-color: transparent"> </view>
      <!-- 顶部导航栏 -->
      <common-navigation-bar
        :nativeFlag="false"
        title="能耗分析"
        backgroundColor="transparent"
        color="var(--tem-color-white)"
      ></common-navigation-bar>
      <!-- 节点名称 -->
      <view :class="['ea-panel-tree', !panelForm.parentNames ? '' : 'ea-panel-has-parent']" @click="handlePageTo">
        <view class="ea-panel-tree-name">{{ panelForm.treeName }}</view>
        <view class="ea-panel-tree-parent">{{ panelForm.parentNames }}</view>
      </view>
      <!-- 时间颗粒度Tab -->
      <ecs-energy-tab
        :tabList="timeUnitList"
        :selectedCode="panelForm.timeUnit"
        @select="handleTimeUnitChange"
      ></ecs-energy-tab>
      <!-- 能源类型&时间 -->
      <view class="ea-panel-bottom">
        <text class="ea-panel-bottom-energy">电({{ panelForm.unit }})</text>
        <picker mode="date" :value="panelForm.date" fields="month" @change="handleDateChange">
          <view class="ea-panel-bottom-date">
            <text>{{ panelForm.date }}</text>
            <icon-down />
          </view>
        </picker>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
// 公共库
import { onLoad, onShow } from '@dcloudio/uni-app';
import { reactive } from 'vue';
// 工具方法
import { mapEnergyAnalysisBgImage } from './utils/index';
// 接口
import { type Ea_IPanelForm } from './energy-analysis.api';
import { type Common_IObject, type Common_ICodeName } from '../../api/model';
// 枚举
import { Common_ETimeUnit } from '../../config/enum';
// 组件
import EcsEnergyTab from '../energy-consumption-scan/ecs-energy-tab/ecs-energy-tab.vue';
import { IconDown } from '@arco-iconbox/vue-tem';
// 面板数据
const panelForm = reactive<Ea_IPanelForm>({
  treeId: '',
  treeName: '测测试节点名称',
  date: '',
  parentNames: '',
  energyCode: '20000',
  timeUnit: Common_ETimeUnit.日,
  unit: 'm³',
});
// 时间颗粒度数组
const timeUnitList: Common_ICodeName<string>[] = Object.entries(Common_ETimeUnit)?.map(([k, v]) => {
  return {
    code: v,
    name: k,
  };
});
/**
 * 切换时间颗粒度
 * @param value
 */
const handleTimeUnitChange = (value: string) => {
  console.log('切换颗粒度', value);
};
/**
 * 切换日期
 * @param event
 */
const handleDateChange = (event: Common_IObject) => {
  panelForm.date = (event.detail as Common_IObject).value + '' ?? '';
};
// 跳转
const handlePageTo = () => {
  console.log(13212);
  uni.navigateTo({
    url: '/pages/energy-analysis/energy-analysis?id=' + (Math.random() * 1000000).toFixed(0),
  });
};
/**
 * 页面加载，接口路由传参
 */
onLoad((options) => {
  console.log('onLoad------------', options);
});
onShow(() => {
  console.log('onShow--------------------');
});
</script>
<style lang="scss" scoped>
.energy-analysis {
  .ea-panel {
    display: flex;
    flex-direction: column;

    position: relative;
    width: 100%;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    transition: none;

    .ea-panel-tree {
      padding: 12px 16px 8px;
      color: var(--tem-color-white);

      .ea-panel-tree-name {
        font-size: var(--te-font-size-h20);
        font-weight: 600;
        line-height: 28px;
        padding: 13px 0;
      }

      .ea-panel-tree-parent {
        font-size: var(--tem-font-size-b14);
        color: var(--tem-color-white);
        line-height: 22px;
      }

      &.ea-panel-has-parent {
        .ea-panel-tree-name {
          padding: 0;
        }

        .ea-panel-tree-parent {
          margin-top: 8px;
        }
      }
    }

    :deep(.ecs-energy-tab .eet-item) {
      width: 64px;
    }

    .ea-panel-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      margin-top: 8px;
      border-radius: 16px 16px 0 0;
      background: linear-gradient(89.99deg, rgba(231, 247, 255, 1) 0.01%, rgba(249, 250, 254, 1) 99.99%);
      background-image: url('../../assets/images/energy-analysis/ea-panel-bottom-bg.svg');
      background-size: cover;
      background-position: top center;
      background-repeat: no-repeat;
      transition: none;

      .ea-panel-bottom-energy {
        font-size: var(--te-font-size-h16);
        color: var(--tem-text-color-primary);
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
      }

      .ea-panel-bottom-date {
        display: flex;
        align-items: center;
        font-size: var(--te-font-size-b14);
        color: rgb(48, 49, 51);
        line-height: 22px;
      }
    }
  }
}
</style>
