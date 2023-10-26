<template>
  <view class="energy-consumption-scan">
    <view
      :class="[energyStickyFlag ? 'is-fixed' : '', 'ecs-panel']"
      :style="{
        height: mapPanelHeight(),
        'min-height': mapPanelHeight(),
        'background-image': topLevelFlag ? mapBackgroundImageByEnergyCode(filterForm.energyCode, energyStickyFlag) : '',
      }"
    >
      <!-- 顶部导航栏 -->
      <common-navigation-bar
        :nativeFlag="false"
        :statusBar="true"
        title="能源纵览"
        :backgroundColor="navigatorStyle.backgroundColor"
        :color="navigatorStyle.color"
      ></common-navigation-bar>
      <!-- 节点&时间 -->
      <ecs-tree-date
        :filterForm="filterForm"
        :navigatorStyle="navigatorStyle"
        @date-change="handleDateChange"
      ></ecs-tree-date>
      <!-- 能源类型 -->
      <ecs-energy-tab
        :tabList="energyCodeList"
        :navigatorStyle="navigatorStyle"
        :energyStickyFlag="energyStickyFlag"
        :selectedCode="filterForm.energyCode"
        @select="handleEnergyCodeChange"
      ></ecs-energy-tab>
      <!-- 纵览卡片 -->
      <ecs-consumption-card :consumptionData="consumptionData"></ecs-consumption-card>
    </view>
  </view>
</template>

<script setup lang="ts">
// 公共库
import { ref, reactive } from 'vue';
import { onLoad, onHide, onShow } from '@dcloudio/uni-app';
// 组件
import EcsConsumptionCard from './ecs-consumption-card/ecs-consumption-card.vue';
import EcsEnergyTab from './ecs-energy-tab/ecs-energy-tab.vue';
import EcsTreeDate from './ecs-tree-date/ecs-tree-date.vue';
// 工具方法
import { FGetQueryParam, mapSystemInfo } from '../../utils/index';
import { mapBackgroundImageByEnergyCode } from './utils';
import { throttle } from 'lodash';
// 接口
import {
  type Ecs_IConsumptionData,
  type Ecs_IFilterForm,
  type Ecs_INavigatorStyle,
  mockData,
} from './energy-consumption-scan.api';
import type { Common_IObject } from '@/api/model';
// 钩子函数
import { useCommonEnergy } from '../../hook/energyCode';
// 过滤面板高度
const filterPanelHeight = ref<number>(518);
const mapPanelHeight = () => {
  return `${filterPanelHeight.value}px`;
};
// 能源类型
const { energyCodeList, queryEnergyCodeList } = useCommonEnergy();
// 表单
const filterForm = reactive<Ecs_IFilterForm>({
  treeId: '',
  treeName: '测试节点',
  date: '2023-01',
  energyCode: '00000',
  childTreeId: '',
});
/**
 * 切换日期
 * @param {string} value
 */
const handleDateChange = (value: string) => {
  filterForm.date = value;
};
/**
 * 切换能源类型
 * @param {string} code
 * @returns {void}
 */
const handleEnergyCodeChange = (code: string): void => {
  filterForm.energyCode = code;
};

// 是否是顶级节点-通过判断地址栏有没有传参，主要是控制顶部是否有背景图，部分模块背景色等
const topLevelFlag = ref<boolean>(false);
// 能源类型是否吸顶
const energyStickyFlag = ref<boolean>(false);
// 导航栏样式
const navigatorStyle = reactive<Ecs_INavigatorStyle>({
  backgroundColor: 'transparent',
  color: 'var(--tem-color-white)',
});

// 纵览数据
const consumptionData = reactive<Ecs_IConsumptionData>(mockData);

/**
 * 监听页面滚动,判断能源类型tab是否吸顶
 * @returns {void}
 */
const handleScroll = throttle((): void => {
  // 滚动距离
  const top = document.documentElement.scrollTop || document.body.scrollTop;
  // dom距离顶部距离
  const targetEle = document.querySelector('.ecs-energy-tab') as HTMLElement;
  if (!targetEle) {
    return;
  }
  const offsetTop = targetEle.offsetTop;
  energyStickyFlag.value = top > offsetTop;
  // 如果能源类型吸顶
  navigatorStyle.backgroundColor = energyStickyFlag.value ? 'var(--tem-color-white)' : 'transparent';
  navigatorStyle.color = energyStickyFlag.value ? 'var(--tem-text-color-primary)' : 'var(--tem-color-white)';
}, 233);

/**
 * 校验是否是顶级节点
 */
const checkTopLevel = () => {
  // 地址栏没有treeId
  topLevelFlag.value = !FGetQueryParam('treeId');
  navigatorStyle.backgroundColor = !topLevelFlag.value ? 'var(--tem-color-white)' : 'transparent';
  navigatorStyle.color = !topLevelFlag.value ? 'var(--tem-text-color-primary)' : 'var(--tem-color-white)';
};
/**
 * 接受上页的参数，联网取数据，更新data
 */
onLoad(() => {
  console.log('onLoad');
  queryEnergyCodeList();
  const { screenHeight, screenWidth, platform, navigationBarHeight, statusBarHeight } = mapSystemInfo();
  console.log(screenHeight, screenWidth, platform, navigationBarHeight, statusBarHeight);
  // 监听滚动事件
  window.addEventListener('scroll', handleScroll);
});
/**
 *
 */
onShow(() => {
  console.log('onshow');
  checkTopLevel();
});
/**
 * 页面销毁
 */
onHide(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss">
.energy-consumption-scan {
  display: flex;
  flex-direction: column;
  background-color: var(--tem-bg-color-page);
  min-height: 100%;

  .ecs-panel {
    position: relative;
    width: 100%;
    background-size: contain;
    background-position: top center;
    background-repeat: no-repeat;
    transition: none;
  }
}
</style>
