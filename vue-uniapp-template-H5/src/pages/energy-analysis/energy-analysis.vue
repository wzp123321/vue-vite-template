<template>
  <view
    :class="['energy-analysis', landscapeFlag || mapNetworkError() || mapLoadError() ? 'is-landscape' : '']"
    :style="{
      'background-image':
        mapNetworkError() || mapLoadError() || landscapeFlag ? '' : mapEnergyAnalysisBgImage(panelForm.energyCode),
    }"
  >
    <z-paging
      :auto="false"
      ref="zPagingRef"
      :refresher-only="true"
      :lower-threshold="'300rpx'"
      @onRefresh="handlePullDownRefresh"
    >
      <!-- 顶部导航栏 -->
      <template #top>
        <!-- 顶部导航栏 -->
        <common-navigation-bar
          :nativeFlag="false"
          title="能耗分析"
          :statusBar="true"
          :backgroundColor="navigatorStyle.backgroundColor"
          :color="navigatorStyle.color"
        >
          <template v-slot:right>
            <icon-filter @click="handlePageTo('/pages/energy-analysis/ea-search/ea-search', panelForm)" />
          </template>
        </common-navigation-bar>
      </template>
      <!-- 自定义下拉刷新view(如果use-custom-refresher为true且不设置下面的slot="refresher"，此时不用获取refresherStatus，会自动使用z-paging自带的下拉刷新view) -->
      <template #refresher="{ refresherStatus }">
        <common-refresher :refresherStatus="refresherStatus" :transparentFlag="!landscapeFlag"></common-refresher>
      </template>
      <!-- 节点名称 -->
      <view class="ea-panel" v-if="!mapNetworkError() && !mapLoadError()">
        <view
          v-if="!mapIsLandscapeFlag()"
          :class="['ea-panel-tree', !panelForm.parentNames ? '' : 'ea-panel-has-parent']"
          @click="handlePageTo('/pages/energy-analysis/energy-analysis', { id: (Math.random() * 1000000).toFixed(0) })"
        >
          <view class="ea-panel-tree-name">{{ panelForm.treeName }}</view>
          <view class="ea-panel-tree-parent">{{ panelForm.parentNames }}</view>
        </view>
        <!-- 时间颗粒度Tab -->
        <ecs-energy-tab
          v-if="!mapIsLandscapeFlag()"
          :tabList="timeUnitList"
          :selectedCode="panelForm.timeUnit"
          :transparentFlag="true"
          @select="handleTimeUnitChange"
        ></ecs-energy-tab>
        <!-- 能源类型&时间 -->
        <view class="ea-panel-bottom" v-if="!mapIsLandscapeFlag()">
          <text class="ea-panel-bottom-energy">{{ panelForm.energyName }} {{ `(${panelForm.unit})` }}</text>
          <!-- <tem-dateTimePicker
            mode="date"
            :value="panelForm.date"
            :fields="panelForm.timeUnit"
            :end="getCurrentDateStr()"
            @change="handleDateChange"
          >
            <view class="ea-panel-bottom-center">
              <text>{{ panelForm?.date }}</text>
              <IconDown></IconDown>
            </view>
            <template #headerTitle>
              <text>选择日期</text>
            </template>
          </tem-dateTimePicker> -->
        </view>
      </view>
      <!-- 内容区 -->
      <ea-scan
        v-if="!mapIsLandscapeFlag() && !mapNetworkError() && !mapLoadError()"
        :total="analysisDetail.total as number"
        :monthAndMonthRate="(analysisDetail.monthAndMonthRate as number)"
        :yearAndYearRate="analysisDetail.yearAndYearRate as number"
      ></ea-scan>
      <ea-charts
        v-if="!mapNetworkError() && !mapLoadError()"
        :landscapeFlag="landscapeFlag"
        :energy-code="panelForm.energyCode"
        :timeUnit="panelForm.timeUnit"
        :barDataList="analysisDetail.barDataList"
        :emptyFlag="mapDataEmpty()"
        @change="handleLandscapeFlagChange"
        @drill="handleLineChartDrill"
      ></ea-charts>
      <!-- 缺省状态 -->
      <view class="ea-error" v-if="mapNetworkError() || mapLoadError()">
        <!-- 网络异常缺省 -->
        <common-network-error v-if="mapNetworkError()" @refresh="handleRefresh"></common-network-error>
        <!-- 加载失败-任意接口报错都出现 -->
        <common-load-error v-if="!mapNetworkError() && mapLoadError()" @refresh="handleRefresh"></common-load-error>
      </view>
    </z-paging>
  </view>
</template>
<script lang="ts" setup>
// 公共库
import { onHide, onLoad, onShow } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
// 工具方法
import { mapEnergyAnalysisBgImage } from './utils/index';
import { FGetQueryParam, handlePageTo, getCurrentDateStr } from '../../utils/index';
// 接口
import type { Ea_IPanelForm } from './energy-analysis.api';
import type { Common_IObject, Common_ICodeName } from '../../api/model';
// 枚举
import { Common_ETimeUnit } from '../../config/enum';
// 组件
import EcsEnergyTab from '../energy-consumption-scan/ecs-energy-tab/ecs-energy-tab.vue';
import EaScan from './ea-scan/ea-scan.vue';
import EaCharts from './ea-charts/ea-charts.vue';
import { IconDown, IconFilter } from '@arco-iconbox/vue-tem';
// hook
import { useEnergyAnalysisController } from './hook/index';
import { useNetwork } from '../../hook/index';
import type { Ecs_INavigatorStyle } from '../energy-consumption-scan/energy-consumption-scan.api';
// 面板数据
const panelForm = reactive<Ea_IPanelForm>({
  treeId: '',
  treeName: '测测试节点名称',
  date: '2023-11-01',
  parentNames: '测试测试',
  energyCode: '01000',
  energyName: '点',
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
  panelForm.timeUnit = value;
  console.log('切换颗粒度', value);

  queryDetail();
};
/**
 * 切换日期
 * @param event
 */
const handleDateChange = (event: Common_IObject) => {
  panelForm.date = (event.detail as Common_IObject).value + '' ?? '';

  queryDetail();
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
// 是否横屏
const landscapeFlag = ref<boolean>(false);
// 是否是横屏模式
const mapIsLandscapeFlag = () => {
  return landscapeFlag.value;
};
// 导航栏样式
const navigatorStyle = reactive<Ecs_INavigatorStyle>({
  backgroundColor: 'transparent',
  color: 'var(--tem-color-white)',
});
/**
 * 判断是否需要透明样式
 * @returns {void}
 */
const updateNavigatorStyle = (): void => {
  // 没有接口报错没有缺省没有断网
  const flag = !mapNetworkError() && !mapLoadError() && !mapIsLandscapeFlag();
  console.log('%c✨✨判断是否为透明✨✨', 'font-size: 24px', flag);
  navigatorStyle.backgroundColor = flag ? 'transparent' : 'var(--tem-color-white)';
  navigatorStyle.color = flag ? 'var(--tem-color-white)' : 'var(--tem-text-color-primary)';
};
/**
 * 切换横屏
 * @param flag
 */
const handleLandscapeFlagChange = (flag: boolean) => {
  landscapeFlag.value = flag;
  updateNavigatorStyle();
};
/**
 * 图表钻取
 * @param index
 */
const handleLineChartDrill = (index: number) => {
  console.log('%c✨✨图表钻取✨✨', 'font-size: 24px', index);
};

/**
 * 异常状态
 */
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
const { analysisDetail, queryDefaultTreeInfo, queryAnalysisDetail } = useEnergyAnalysisController();
/**
 * 暂无数据
 * @returns {boolean}
 */
const mapDataEmpty = (): boolean => {
  return !analysisDetail.total;
};
/**
 * 刷新
 */
const handleRefresh = () => {
  console.log('%c✨✨刷新✨✨', 'font-size: 24px');
  loadErrorFlag.value = false;
  networkErrorFlag.value = false;

  updateNavigatorStyle();
};
/**
 * 初始化，查询节点以及节点信息
 */
const init = async () => {
  loadErrorFlag.value = false;
  try {
    uni.showLoading({
      title: '加载中...',
    });
    // 如果是顶级节点
    if (!FGetQueryParam('treeId')) {
      const res = await queryDefaultTreeInfo().catch((err) => {
        console.log('%c✨✨查询默认节点信息报错✨✨', 'font-size: 24px', err);
        loadErrorFlag.value = true;
        updateNavigatorStyle();
      });
      panelForm.treeId = res?.treeId ?? '';
      panelForm.treeName = res?.treeName ?? '';
      panelForm.energyCode = res?.energyCode ?? '';
      panelForm.energyName = res?.energyName ?? '';
    }
    queryDetail();
  } catch (error) {
    loadErrorFlag.value = true;
    console.log('%c✨✨初始化✨✨', 'font-size: 24px', error);
  } finally {
    uni.hideLoading();
  }
};
/**
 * 查详情
 */
const queryDetail = () => {
  queryAnalysisDetail()
    .then((res) => {
      updateNavigatorStyle();
    })
    .catch((err) => {
      console.log('%c✨✨查询默认节点信息报错✨✨', 'font-size: 24px', err);
      loadErrorFlag.value = true;
      updateNavigatorStyle();
    });
};
const { networkErrorFlag, onWatchNetworkStatus, offWatchNetworkStatus } = useNetwork();
/**
 * 页面加载
 */
onShow(async () => {
  networkErrorFlag.value = false;
  // 如果地址栏带了参数
  const energyCode = FGetQueryParam('energyCode');
  console.log(energyCode);
  if (!!energyCode) {
    panelForm.energyCode = energyCode;
  }

  await init();
});
onLoad(() => {
  onWatchNetworkStatus();
});
onHide(() => {
  offWatchNetworkStatus;
});
</script>
<style lang="scss" scoped>
.energy-analysis {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-size: 100% 400rpx;
  background-position: top center;
  background-repeat: no-repeat;
  transition: none;
  background-color: var(--tem-bg-color-page);

  :deep(.z-paging-content) {
    .uni-scroll-view-content {
      min-height: 100%;
    }

    .zp-paging-container-content {
      flex: auto;
      display: flex;
      flex-direction: column;
    }

    .common-navigation-bar {
      .uni-navbar__header-btns-right svg {
        width: 48rpx;
        height: 48rpx;
      }
    }

    .ea-panel {
      display: flex;
      flex-direction: column;

      position: relative;
      width: 100%;

      .ea-panel-tree {
        padding: 24rpx 32rpx 16rpx;
        color: var(--tem-color-white);

        .ea-panel-tree-name {
          font-size: var(--tem-font-size-h20);
          font-weight: 600;
          line-height: 56rpx;
          padding: 26rpx 0;
        }

        .ea-panel-tree-parent {
          font-size: var(--tem-font-size-b14);
          color: var(--tem-color-white);
          line-height: 44rpx;
        }

        &.ea-panel-has-parent {
          .ea-panel-tree-name {
            padding: 0;
          }

          .ea-panel-tree-parent {
            margin-top: 16rpx;
          }
        }
      }

      :deep(.ecs-energy-tab) {
        padding: 32rpx 0;

        .eet-item {
          width: 128rpx;
        }
      }

      .ea-panel-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24rpx 32rpx;
        margin-top: 16rpx;
        border-radius: 32rpx 32rpx 0 0;
        background: linear-gradient(89.99deg, rgba(231, 247, 255, 1) 0.01%, rgba(249, 250, 254, 1) 99.99%);
        background-image: url('../../assets/images/energy-analysis/ea-panel-bottom-bg.svg');
        background-size: cover;
        background-position: top center;
        background-repeat: no-repeat;
        transition: none;

        .ea-panel-bottom-energy {
          font-size: 32rpx;
          color: var(--tem-text-color-primary);
          font-weight: 600;
          font-size: 32rpx;
          line-height: 48rpx;
        }

        .ea-panel-bottom-center {
          display: flex;
          align-items: center;
          font-size: 28rpx;
          color: rgb(48, 49, 51);
          line-height: 44rpx;
        }
      }
    }

    .ea-error {
      flex: auto;
    }

    &.is-landscape {
      transition: none;

      .ea-panel-tree,
      .ecs-energy-tab,
      .ea-panel-bottom,
      .ea-scan {
        display: none;
      }
    }
  }
}
</style>
