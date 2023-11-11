<template>
  <view class="ea-search">
    <!-- 自定义导航栏 -->
    <common-navigation-bar :nativeFlag="false" :statusBar="true">
      <template v-slot:middle>
        <ecs-energy-tab
          :tabList="treeTypeList"
          :selectedCode="treeType"
          :transparentFlag="false"
          height="88rpx"
          @select="handleTreeTypeChange"
        ></ecs-energy-tab>
      </template>
    </common-navigation-bar>

    <view class="es-body">
      <!-- 能源类型 -->
      <text class="es-body-title">能耗类型</text>
      <!--  -->
      <es-energy-switch
        :energyCode="energyCode"
        :energyCodeList="energyCodeList"
        @change="handleEnergyCodeChange"
      ></es-energy-switch>
      <!-- 分析对象 -->
      <text class="es-body-title">分析对象</text>
      <!-- 搜索框 -->
      <view class="es-body-search">
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
      <es-search-history v-if="searchFlag" :list="historyList" @triggerSearch="triggerSearch"></es-search-history>
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
    <view class="es-bottom">
      <button class="es-bottom-reset" @click="handleReset">重置</button>
      <button class="es-bottom-submit" @click="handleSubmit">确定</button>
    </view>
  </view>
</template>
<script lang="ts" setup>
// 公共库
import { onShow } from '@dcloudio/uni-app';
import { ref } from 'vue';
// hook
import { useCommonTree, useCommonEnergy } from '../../../hook';
// 组件
import EcsEnergyTab from '../../energy-consumption-scan/ecs-energy-tab/ecs-energy-tab.vue';
import EsEnergySwitch from './es-energy-switch/es-energy-switch.vue';
import EsSearchHistory from './es-search-history/es-search-history.vue';
import EsSelectCrumbs from './es-select-crumbs/es-select-crumbs.vue';
import EsTreeList from './es-tree-list/es-tree-list.vue';
import { FGetQueryParam, handlePageTo } from '@/utils';

const { treeList, treeType, searchLabel, treeTypeList, searchBreadCrumbList, queryChildrenByTree, queryTreeList } =
  useCommonTree();
const { energyCode, energyCodeList, queryEnergyCodeList } = useCommonEnergy();
/**
 * 切换树类型
 */
const handleTreeTypeChange = () => {
  searchLabel.value = '';
  energyCode.value = energyCodeList.value?.[0]?.code;
  searchFlag.value = false;
  queryTreeList();
};
/**
 * 切换能源类型
 * @param {string} code
 */
const handleEnergyCodeChange = (code: string) => {
  energyCode.value = code;
  searchFlag.value = false;
  queryTreeList();
};
// 搜索历史
let historyList = ['测试', '测猜测', '测猜测', '测猜测', '测猜测', '测猜测', '测猜测', '测猜测', '测猜测'];
// 是否正在搜索
const searchFlag = ref<boolean>(false);
// 触发查询
const triggerSearch = (value: string) => {
  searchLabel.value = value;
  searchFlag.value = true;

  treeList.value = [];
};
/**
 * 取消搜索
 */
const handleSearchCancel = () => {
  searchLabel.value = '';
  searchFlag.value = false;
  treeList.value = [];
};

// 当前节点
const selectedId = ref<number | null>(null);

/**
 * 确定选择
 */
const handleSubmit = () => {
  handlePageTo('/pages/energy-analysis/energy-analysis', { energyCode: energyCode.value });
};
/**
 * 重置
 */
const handleReset = () => {
  handlePageTo('/pages/energy-analysis/energy-analysis');
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
.ea-search {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  :deep(.common-navigation-bar) .ecs-energy-tab .eet-item-selected.eet-item {
    color: var(--tem-color-primary);

    &::before {
      background-color: var(--tem-color-primary);
    }
  }

  .es-body {
    width: 100%;
    flex: auto;
    overflow: hidden;
    margin-top: 16rpx;
    display: flex;
    flex-direction: column;
    background-color: red;

    .es-energy-switch,
    .es-body-title,
    .es-body-search,
    .es-search-history {
      padding: 0 32rpx;
    }

    .es-body-title {
      display: block;
      color: var(--tem-text-color-secondary);
      font-size: 28rpx;
      margin-bottom: 24rpx;
    }

    .es-body-search {
      display: flex;
      align-items: center;
      gap: 20rpx;
      margin-bottom: 16rpx;

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

  .es-bottom {
    padding: 32rpx;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 32rpx;

    .es-bottom-submit,
    .es-bottom-reset {
      padding: 16rpx 48rpx;
      font-weight: 600;
      font-size: 32rpx;
      line-height: 48rpx;

      border-color: var(--tem-border-color);
      background-color: var(--tem-color-white);
      color: rgb(48, 49, 51);
    }

    .es-bottom-submit {
      flex: auto;
      background-color: var(--tem-color-primary);
      color: var(--tem-color-white);
    }
  }
}
</style>
