<template>
  <view
    class="energy-consumption-scan"
    :style="{
      'background-image':
        topLevelFlag && !mapNetworkError() && !mapLoadError()
          ? mapBackgroundImageByEnergyCode(topPanelForm.energyCode, energyStickyFlag)
          : '',
    }"
  >
    <!-- auto=false 关闭自动加载  :refresher-enabled="true"
      :loading-more-enabled="true"
      to-bottom-loading-more-enabled
      :hide-empty-view="mapNetworkError() || mapLoadError() || mapDataEmpty()"
      :lower-threshold="'300rpx'" -->
    <z-paging
      ref="zPagingRef"
      :refresher-enabled="true"
      :loading-more-enabled="true"
      to-bottom-loading-more-enabled
      :hide-empty-view="mapNetworkError() || mapLoadError() || mapDataEmpty()"
      :lower-threshold="'300rpx'"
      @onRefresh="handlePullDownRefresh"
      @scroll="handleScroll"
      @scrolltolower="handleScrollToLower"
    >
      <!-- 顶部导航栏 -->
      <template #top>
        <common-navigation-bar
          :nativeFlag="topLevelFlag"
          :statusBar="false"
          title="能耗纵览"
          :backgroundColor="navigatorStyle.backgroundColor"
          :color="navigatorStyle.color"
        ></common-navigation-bar>
      </template>
      <!-- 自定义下拉刷新view(如果use-custom-refresher为true且不设置下面的slot="refresher"，此时不用获取refresherStatus，会自动使用z-paging自带的下拉刷新view) -->
      <template #refresher="{ refresherStatus }">
        <common-refresher :refresherStatus="refresherStatus" :transparentFlag="topLevelFlag"></common-refresher>
      </template>
      <view class="ecs-panel" v-if="!mapNetworkError() && !mapLoadError()">
        <!-- 节点&时间 -->
        <ecs-tree-date
          :topPanelForm="topPanelForm"
          :transparentFlag="topLevelFlag"
          @date-change="handleDateChange"
        ></ecs-tree-date>
        <!-- 能源类型 -->
        <ecs-energy-tab
          :tabList="energyCodeList"
          :transparentFlag="topLevelFlag"
          :energyStickyFlag="energyStickyFlag"
          :selectedCode="topPanelForm.energyCode"
          @select="handleEnergyCodeChange"
        ></ecs-energy-tab>
      </view>
      <!-- 纵览卡片 -->
      <ecs-consumption-card
        v-if="!mapNetworkError() && !mapLoadError()"
        :consumptionData="energyTotalData"
        :energyCode="topPanelForm.energyCode"
        :topLevelFlag="topLevelFlag"
      ></ecs-consumption-card>
      <!-- 详情卡片 -->
      <ecs-detail-card
        v-if="!mapNetworkError() && !mapLoadError() && !mapDataEmpty()"
        :tagStickyFlag="tagStickyFlag"
        :treeList="treeList"
        :treeDetail="treeDetail"
        :checkedCode="topPanelForm.childTreeId"
        @change="handleChildTreeSelect"
      ></ecs-detail-card>
      <!-- 列表卡片 -->
      <ecs-list-card
        :childTreeList="childTreeList"
        v-if="!mapNetworkError() && !mapLoadError() && !mapDataEmpty()"
      ></ecs-list-card>
      <!-- 缺省状态 -->
      <view class="ecs-error" v-if="mapNetworkError() || mapLoadError() || mapDataEmpty()">
        <!-- 网络异常缺省 -->
        <common-network-error v-if="mapNetworkError()" @refresh="handleRefresh"></common-network-error>
        <!-- 加载失败-任意接口报错都出现 -->
        <common-load-error v-if="!mapNetworkError() && mapLoadError()" @refresh="handleRefresh"></common-load-error>
        <!-- 暂无内容-总能耗为空 -->
        <common-data-empty v-if="!mapNetworkError() && !mapLoadError() && mapDataEmpty()"></common-data-empty>
      </view>
      <!-- 自定义滑动到底部"没有更多数据"状态的view -->
      <template #empty>
        <view>我也是有底线的~</view>
      </template>
    </z-paging>
  </view>
</template>

<script setup lang="ts">
// 公共库
import { ref, reactive, nextTick } from 'vue';
import { onShow } from '@dcloudio/uni-app';
// 组件
import EcsConsumptionCard from './ecs-consumption-card/ecs-consumption-card.vue';
import EcsEnergyTab from './ecs-energy-tab/ecs-energy-tab.vue';
import EcsTreeDate from './ecs-tree-date/ecs-tree-date.vue';
import EcsListCard from './ecs-list-card/ecs-list-card.vue';
import EcsDetailCard from './ecs-detail-card/ecs-detail-card.vue';
// 工具方法
import { FGetQueryParam } from '../../utils/index';
import { mapBackgroundImageByEnergyCode } from './utils';
import { throttle } from 'lodash';
// 接口
import type { Ecs_ITopPanelForm, Ecs_INavigatorStyle } from './energy-consumption-scan.api';
// 钩子函数
import { useCommonEnergy } from '../../hook/energyController';
import { useEnergyConsumptionController } from './hook/index';
// 枚举
import { Common_ENetworkType } from '@/config/enum';

// 表单
const topPanelForm = reactive<Ecs_ITopPanelForm>({
  treeId: '',
  treeName: '测试节点',
  parentNames: '',
  date: '2023-01',
  energyCode: '00000',
  childTreeId: '',
});
/**
 * 切换日期
 * @param {string} value
 * @returns {void}
 */
const handleDateChange = (value: string): void => {
  topPanelForm.date = value;

  handleDataQuery(true);
};
/**
 * 切换能源类型
 * @param {string} code
 * @returns {void}
 */
const handleEnergyCodeChange = (code: string): void => {
  topPanelForm.energyCode = code;
  handleDataQuery(true);
};
/**
 * 切换子节点
 * @param code
 * @returns {void}
 */
const handleChildTreeSelect = (code: string): void => {
  topPanelForm.childTreeId = code;

  handleDataQuery();
};
/**
 * 查询数据
 * @param {boolean} queryTotalFlag
 * @returns {Promise<void>}
 */
const handleDataQuery = async (queryTotalFlag: boolean = false): Promise<void> => {
  uni.showLoading({
    title: '加载中...',
  });
  loadErrorFlag.value = false;
  try {
    let promiseArr = [queryChildrenDetailById()];
    if (queryTotalFlag) {
      promiseArr.push(queryEnergyTotalData());
    }
    await Promise.all(promiseArr);
  } catch (error) {
    console.log('%c✨✨查询数据报错✨✨', 'font-size: 24px', error);
    loadErrorFlag.value = true;
  } finally {
    uni.hideLoading();
    updateNavigatorStyle();
  }
};

/**
 * 异常状态
 */
// 网络异常
const networkErrorFlag = ref<boolean>(false);
// 加载失败
const loadErrorFlag = ref<boolean>(false);
/**
 * 展示网络异常
 * @returns {boolean}
 */
const mapNetworkError = (): boolean => {
  return networkErrorFlag.value;
};
/**
 * 加载失败--有接口报错
 * @returns {boolean}
 */
const mapLoadError = (): boolean => {
  return !networkErrorFlag.value && loadErrorFlag.value;
};

const {
  energyTotalData,
  treeList,
  childTreeList,
  treeDetail,
  queryDefaultTreeInfo,
  queryEnergyTotalData,
  queryChildrenDetailById,
} = useEnergyConsumptionController();
/**
 * 暂无数据
 * @returns {boolean}
 */
const mapDataEmpty = (): boolean => {
  return !energyTotalData.totalConsumptionValue;
};
/**
 * 刷新
 * @returns {void}
 */
const handleRefresh = (): void => {
  loadErrorFlag.value = false;
  networkErrorFlag.value = false;

  updateNavigatorStyle();
};
// 能源类型
const { energyCodeList, queryEnergyCodeList } = useCommonEnergy();
/**
 * 初始化,如果是顶级节点,需要查询能源类型列表
 * @returns {Promise<void>}
 */
const init = async (): Promise<void> => {
  networkErrorFlag.value = false;
  loadErrorFlag.value = false;
  try {
    let promiseArr: Promise<any>[] = [queryEnergyCodeList()];
    if (topLevelFlag.value) {
      promiseArr.push(queryDefaultTreeInfo());
    }
    await Promise.all(promiseArr);
    topPanelForm.childTreeId = treeList.value?.[0]?.code;
  } catch (error) {
    loadErrorFlag.value = true;
    console.log('%c✨✨查询能源类型列表✨✨', 'font-size: 24px', error);
  } finally {
    updateNavigatorStyle();
  }
};

/**
 * 监听网络状态
 * @returns {void}
 */
const watchNetworkStatus = (): void => {
  uni.onNetworkStatusChange((res) => {
    networkErrorFlag.value = false;
    // 如果断开连接或者无网络
    if (!res.isConnected || res.networkType === Common_ENetworkType.无网络) {
      networkErrorFlag.value = true;
    }
  });
};
// 下拉刷新组件实例
const zPagingRef = ref();
/**
 * 下拉刷新
 * @returns {void}
 */
const handlePullDownRefresh = (): void => {
  console.log('%c✨✨触发下拉刷新✨✨', 'font-size: 24px');
  if (zPagingRef.value) {
    setTimeout(() => {
      zPagingRef.value?.complete();
    }, 2000);
  }
};
/**
 * 监听滚动
 * @returns {void}
 */
const handleScroll = throttle((e: any): void => {
  // 滚动距离
  const top = e.detail.scrollTop;
  // dom距离顶部距离
  const targetEle = document.querySelector('.ecs-energy-tab') as HTMLElement;
  //标签头部距离顶部距离
  const tagEle = document.querySelector('.edc-body') as HTMLElement;
  console.log('%c🚀 ~ energy-consumption-scan.vue ~ 215行', 'font-size: 18px', tagEle.offsetTop);
  if (targetEle) {
    const offsetTop = targetEle.offsetTop;
    // 这里应该是差44-
    energyStickyFlag.value = top > offsetTop;
    // 如果是顶级节点才需要判断
    if (topLevelFlag.value) {
      // 如果能源类型吸顶
      updateNavigatorStyle();
    }
  }
  if (tagEle) {
    const tagOffsetTop = tagEle.offsetTop;
    tagStickyFlag.value = top > tagOffsetTop - 48 - 44;
    console.log('%c🚀 ~ energy-consumption-scan.vue ~ 229行', 'font-size: 18px', tagStickyFlag.value);
  }
}, 233);
/**
 * 监听是否滚动到底部
 * 0-默认状态 1.加载中 2.没有更多数据 3.加载失败
 * @returns {void}
 */
const handleScrollToLower = (e: any): void => {
  console.log('%c✨✨触底✨✨', 'font-size: 24px', e);
};
// 是否是顶级节点-通过判断地址栏有没有传参，主要是控制顶部是否有背景图，部分模块背景色等
const topLevelFlag = ref<boolean>(false);
// 能源类型是否吸顶
const energyStickyFlag = ref<boolean>(false);
//详情标签是否吸顶
const tagStickyFlag = ref<boolean>(false);
// 导航栏样式
const navigatorStyle = reactive<Ecs_INavigatorStyle>({
  backgroundColor: 'transparent',
  color: 'var(--tem-color-white)',
});
/**
 * 校验是否是顶级节点
 * @returns {void}
 */
const checkTopLevel = (): void => {
  // 地址栏没有treeId
  topLevelFlag.value = !FGetQueryParam('treeId');
  // 接收参数
  if (!!FGetQueryParam('treeId')) {
    topPanelForm.treeId = FGetQueryParam('treeId') ?? '';
    topPanelForm.treeName = FGetQueryParam('treeName') ?? '';
  }
  updateNavigatorStyle();
};
/**
 * 判断是否需要透明样式
 * @returns {void}
 */
const updateNavigatorStyle = (): void => {
  // 非吸顶状态且是顶级节点且没有接口报错没有缺省没有断网
  const flag = !(
    mapDataEmpty() ||
    mapNetworkError() ||
    mapLoadError() ||
    !topLevelFlag.value ||
    (topLevelFlag.value && energyStickyFlag.value)
  );
  !energyStickyFlag.value && topLevelFlag.value && !mapDataEmpty() && !mapNetworkError() && !mapLoadError();
  console.log('%c✨✨判断是否为透明✨✨', 'font-size: 24px', flag);
  navigatorStyle.backgroundColor = flag ? 'transparent' : 'var(--tem-color-white)';
  navigatorStyle.color = flag ? 'var(--tem-color-white)' : 'var(--tem-text-color-primary)';
};
/**
 * 页面加载
 */
onShow(async () => {
  // 监听网络状态
  watchNetworkStatus();
  checkTopLevel();
  // uni.showLoading({
  //   title: '加载中',
  // });
  // await init();
  // handleDataQuery(true);
  // 初始化调用complete方法
  nextTick(() => {
    if (zPagingRef.value) {
      zPagingRef.value?.complete();
    }
  });
});
</script>

<style lang="scss" scoped>
.energy-consumption-scan {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // min-height: 100%;
  background-size: 100% 436rpx;
  background-position: top center;
  background-repeat: no-repeat;
  transition: none;
  background-color: var(--tem-bg-color-page);

  :deep(.z-paging-content) {
    .ecs-panel {
      position: relative;
      width: 100%;
    }

    .ecs-error {
      flex: auto;
    }

    .uni-scroll-view-content {
      min-height: 100%;
    }

    .zp-empty-view {
      flex: 0;
      padding: 16rpx 0;
      font-size: var(--tem-font-size-s12);
      color: var(--tem-text-color-secondary);
    }

    .zp-paging-container-content {
      flex: auto;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
