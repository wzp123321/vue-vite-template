<!--
 * @Author: yut
 * @Date: 2023-10-31 14:36:19
 * @LastEditors: yut
 * @LastEditTime: 2023-11-07 16:42:38
 * @Descripttion: 
-->
<template>
  <view class="esa-filter">
    <!-- 状态栏 -->
    <view class="ef-status-bar" style="height: 44px; background-color: transparent"> </view>
    <!-- 顶部导航栏 -->
    <common-navigation-bar :nativeFlag="false" title="筛选"></common-navigation-bar>
    <view class="ef-body">
      <!-- 能耗类型 -->
      <view class="ef-body-title">
        <text>能耗类型</text>
      </view>
      <!-- 能耗类型列表 -->
      <esa-filter-type :type-list="energyCodeList" @select="selectEnergyCode"></esa-filter-type>
      <!-- 定额类型 -->
      <view class="ef-body-title">
        <text>定额类型</text>
      </view>
      <!-- 定额列表 -->
      <esa-filter-type :type-list="timeTypeList" @select="selectTimeCode"></esa-filter-type>
      <view class="ef-body-title ef-body-date">
        <text>选择日期</text>
      </view>

      <view class="ef-body-title">
        <text>分析对象</text>
      </view>
      <!-- tab -->
      <esa-filter-tab :tree-type-list="treeTypeList" @select="selectTreeTypeCode"></esa-filter-tab>
      <!-- 搜索框 -->
      <view class="ef-body-search">
        <uni-easyinput
          type="text"
          :trim="true"
          placeholder="搜索"
          :inputBorder="false"
          v-model="searchLabel"
          :prefixIcon="'search'"
          placeholderStyle="fontSize:28rpx"
          @confirm="triggerSearch($event)"
          @iconClick="triggerSearch($event)"
        ></uni-easyinput>
        <text class="es-body-search-cancel" v-show="searchFlag" @click="handleSearchCancel">取消</text>
      </view>
      <!-- 搜索历史 -->
      <es-search-history :list="historyList" @triggerSearch="triggerSearch"></es-search-history>
      <!-- 搜索面包屑 -->
      <es-select-crumbs
        v-if="!searchFlag"
        :list="searchBreadCrumbList"
        @select="queryChildrenByTree"
      ></es-select-crumbs>
      <!-- 树列表 -->
      <es-tree-list
        v-if="treeList.length"
        v-model="selectedId"
        :treeList="treeList"
        @drill="queryTreeList"
      ></es-tree-list>
      <!-- 搜索为空 -->
      <common-search-empty v-if="searchFlag && !treeList.length"></common-search-empty>
      <!-- 列表为空 -->
      <common-data-empty v-if="!searchFlag && !treeList.length"></common-data-empty>
    </view>
    <!-- 底部按钮 -->
    <view class="ef-bottom">
      <button class="ef-bottom-reset" @click="handleReset">重置</button>
      <button class="ef-bottom-submit" @click="handleSubmit">确定</button>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useCommonEnergy } from '@/hook/energyController';
import { onMounted, reactive, ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { useCommonTree } from '@/hook';
// 组件
import { EsaFilterType, EsaFilterTab } from './components/index';
import EsSearchHistory from '../../energy-analysis/ea-search/es-search-history/es-search-history.vue';
import EsSelectCrumbs from '../../energy-analysis/ea-search/es-select-crumbs/es-select-crumbs.vue';
import EsTreeList from '../../energy-analysis/ea-search/es-tree-list/es-tree-list.vue';
import { FGetQueryParam, handlePageTo } from '@/utils';
// 能源类型
const { energyCodeList, queryEnergyCodeList, energyCode } = useCommonEnergy();
const { treeList, treeType, searchLabel, treeTypeList, searchBreadCrumbList, queryChildrenByTree, queryTreeList } =
  useCommonTree();

// 搜索历史
let historyList = ['测试', '测猜测', '测猜测', '测猜测', '测猜测', '测猜测', '测猜测', '测猜测', '测猜测'];
// 是否正在搜索
const searchFlag = ref<boolean>(false);
// 触发查询
const triggerSearch = (value: string) => {
  searchLabel.value = value;
  searchFlag.value = true;
};

/**
 * 取消搜索
 */
const handleSearchCancel = () => {
  searchLabel.value = '';
  searchFlag.value = false;
};
// 当前节点
const selectedId = ref<number | null>(null);

//定额类型
const timeTypeList = reactive([
  {
    name: '月',
    code: 'month',
  },
  {
    name: '年',
    code: 'year',
  },
]);

const selectEnergyCode = (code: string) => {
  console.log('%c🚀 ~ esa-filter.vue ~ 43行', 'font-size: 18px', code);
  energyCode.value = code;
};

const selectTreeTypeCode = (code: string) => {
  console.log('%c🚀 ~ esa-filter.vue ~ 43行', 'font-size: 18px', code);
  treeType.value = code;
};

const currentTimeCode = ref('');
const selectTimeCode = (code: string) => {
  currentTimeCode.value = code;
  console.log('%c🚀 ~ esa-filter.vue ~ 62行', 'font-size: 18px', code);
};

/**
 * 确定选择
 */
const handleSubmit = () => {
  handlePageTo('/pages/energy-saving-assessment/energy-saving-assessment', { energyCode: energyCode.value });
};
/**
 * 重置
 */
const handleReset = () => {
  handlePageTo('/pages/energy-saving-assessment/energy-saving-assessment');
};

/**
 * 初始化
 */
onShow(async () => {
  console.log('%c✨✨页面跳转✨✨', 'font-size: 24px', FGetQueryParam('energyCode'));
  await queryEnergyCodeList();
  if (FGetQueryParam('energyCode')) {
    energyCode.value = FGetQueryParam('energyCode') ?? '00000';
  }
  searchLabel.value = '';
  searchBreadCrumbList.value = [];
  historyList = [];
  queryTreeList();
});
</script>

<style lang="scss" scoped>
.esa-filter {
  height: 100%;
  display: flex;
  flex-direction: column;
  // 内容区域
  .ef-body {
    padding: 16rpx 0;
    flex: auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .es-body-search,
    .es-search-history {
      padding: 0 32rpx;
    }
    &-title {
      height: 44rpx;
      line-height: 44rpx;
      margin-bottom: 24rpx;
      font-size: 28rpx;
      padding: 0 32rpx;
      color: var(--tem-text-color-secondary);
    }
    &-date {
      height: 112rpx;
      line-height: 112rpx;
      padding: 0;
      margin: 0 32rpx 24rpx;
      display: flex;
      align-items: center;
      border-bottom: 1rpx solid var(--tem-border-color-light);
    }

    &-search {
      display: flex;
      align-items: center;
      gap: 20rpx;
      margin: 8rpx 0;
      padding: 0 32rpx;

      :deep(.uni-easyinput) {
        flex: auto;

        .uni-easyinput__content {
          border-radius: 8rpx;
          background-color: var(--tem-fill-color) !important;
        }

        .is-focused .uni-icons.content-clear-icon,
        .uni-icons.content-clear-icon::before {
          color: var(--tem-text-color-secondary) !important;
        }
      }

      > text {
        white-space: nowrap;
        font-size: var(--tem-font-size-b16);
        color: var(--tem-color-primary);
      }
    }
  }

  // 底部按钮
  .ef-bottom {
    padding: 32rpx;
    display: flex;
    gap: 32rpx;

    button {
      padding: 16rpx 48rpx;
      font-weight: 600;
      font-size: 32rpx;
      line-height: 48rpx;
    }

    &-reset {
      border-color: var(--tem-border-color);
      background-color: var(--tem-color-white);
      color: rgb(48, 49, 51);
      width: 80px;
    }
    &-submit {
      flex: auto;
      background-color: var(--tem-color-primary);
      color: var(--tem-color-white);
    }
  }
}
</style>
