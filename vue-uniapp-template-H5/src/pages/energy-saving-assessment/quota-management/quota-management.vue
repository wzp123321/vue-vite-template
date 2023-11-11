<!--
 * @Author: yut
 * @Date: 2023-10-23 16:52:37
 * @LastEditors: yut
 * @LastEditTime: 2023-11-07 17:03:36
 * @Descripttion: 
-->
<template>
  <view class="energy-saving-assessment">
    <!-- 顶部导航栏 -->
    <common-navigation-bar :nativeFlag="false" title="定额管理"></common-navigation-bar>
    <view class="esa-header">
      <zb-dropdown-menu style="width: 100%">
        <zb-dropdown-item name="date" :options="dateOption" v-model="date" @change="selectChange"></zb-dropdown-item>
        <zb-dropdown-item name="area" :options="areaOption" v-model="area" @change="selectChange"></zb-dropdown-item>
        <zb-dropdown-item name="level" :options="levelOption" v-model="level" @change="selectChange"></zb-dropdown-item>
      </zb-dropdown-menu>
    </view>

    <view class="esa-content">
      <view v-for="(item, index) in dataList" :key="'card' + index">
        <qmCard :name="item.name" :energyList="item.energyTypeList"></qmCard>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { QM_EAreaType, QM_EDateType, QM_ELevelType } from './quota-management.api';

//组件
import qmCard from './qm-card/qm-card.vue';
//时间
const date = ref(QM_EDateType.本月);
const dateOption = Object.entries(QM_EDateType).map(([k, v]) => ({ value: v, text: k }));

//区域
const area = ref(QM_EAreaType.区域);
const areaOption = Object.entries(QM_EAreaType).map(([k, v]) => ({ value: v, text: k }));

// 节点
const level = ref(QM_ELevelType.一级);
const levelOption = Object.entries(QM_ELevelType).map(([k, v]) => ({ value: v, text: k }));

//数据
const dataList = ref([
  {
    name: '南京妇幼保健院',
    energyTypeList: [
      {
        energyName: '总能耗',
        energyCode: '0000',
        parent: 80,
        status: '1',
      },
      {
        energyName: '电',
        energyCode: '0001',
        parent: 60,
        status: '2',
      },
      {
        energyName: '水',
        energyCode: '0002',
        parent: 40,
        status: '3',
      },
      {
        energyName: '燃气',
        energyCode: '0003',
        parent: 80,
        status: '1',
      },
    ],
  },
  {
    name: '第二住院楼',
    energyTypeList: [
      {
        energyName: '总能耗',
        energyCode: '0000',
        parent: 80,
        status: '1',
      },
      {
        energyName: '电',
        energyCode: '0001',
        parent: 50,
        status: '2',
      },
      {
        energyName: '水',
        energyCode: '0002',
        parent: 40,
        status: '3',
      },
      {
        energyName: '市政热水',
        energyCode: '0003',
        parent: 20,
        status: '2',
      },
    ],
  },
  {
    name: '第四住院楼',
    energyTypeList: [
      {
        energyName: '总能耗',
        energyCode: '0000',
        parent: 90,
        status: '1',
      },
      {
        energyName: '电',
        energyCode: '0001',
        parent: 40,
        status: '2',
      },
      {
        energyName: '水',
        energyCode: '0002',
        parent: 40,
        status: '1',
      },
      {
        energyName: '市政热水',
        energyCode: '0003',
        parent: 60,
        status: '3',
      },
    ],
  },
]);

const selectChange = (item: { text: string; value: string }) => {
  console.log('%c🚀 ~ energy-saving-assessment.vue ~ 125行', 'font-size: 18px', date.value);
};
</script>
<style scoped>
.energy-saving-assessment {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  /* 头部 */
  .esa-header {
    height: 92rpx;
    display: flex;
    flex: none;
    align-items: center;
    background-color: var(--tem-color-white);
  }
  /* 内容区域 */
  .esa-content {
    flex: auto;
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    background-color: #f2f3f5;
    padding: 16rpx 32rpx;
  }
  :deep(.zb-dropdown-menu__title--active) {
    color: var(--tem-color-primary) !important;
  }
  :deep(.active-cell__title, .active-icon) {
    color: var(--tem-color-primary) !important;
  }
  :deep(.active-icon) {
    color: var(--tem-color-primary) !important;
  }
  :deep(.zb-dropdown-menu__bar--opened) {
    box-shadow: none;
  }
  :deep(.zb-popup > uni-view) {
    border-top: 1rpx solid #ebedf0;
  }
}
</style>
