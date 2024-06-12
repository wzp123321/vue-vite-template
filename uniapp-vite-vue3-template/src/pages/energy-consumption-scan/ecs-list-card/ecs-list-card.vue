<!--
 * @Author: yut
 * @Date: 2023-11-01 15:12:29
 * @LastEditors: yut
 * @LastEditTime: 2023-11-06 10:31:43
 * @Descripttion: 
-->
<template>
  <view class="elc-list-card">
    <view class="elc-container" v-for="(item, index) in elcService.cardData" :key="index">
      <uni-collapse class="elc-container-collapse">
        <uni-collapse-item :border="false" :name="item.name">
          <template #title>
            <view class="elc-coolapse-header">
              <view class="elc-coolapse-header-title">
                <text>{{ item.name }}</text>
              </view>
              <view class="elc-coolapse-header-des">
                <text>{{ thousandSeparation(item.consumption) }}kgce</text>
                <text>{{ thousandSeparation(item.cost) }}万元</text>
              </view>
            </view>
          </template>
          <view class="elc-content">
            <view class="elc-content-header">
              <text></text>
              <text>名称</text>
              <text>能耗值(kgce)</text>
              <text>成本(万元)</text>
            </view>
            <view class="elc-content-table">
              <uni-collapse class="elc-wrap-collapse">
                <uni-collapse-item
                  :border="false"
                  v-for="(ite, idx) in item.data"
                  :class="!ite.children.length ? 'no-children' : ''"
                  :key="idx"
                >
                  <template #title>
                    <view class="elc-wrap-item">
                      <view class="elc-wrap-item-name">
                        <text>{{ ite.name }}</text>
                      </view>
                      <view class="elc-wrap-item-consumption">
                        <text>{{ thousandSeparation(ite.consumption) }}</text>
                      </view>
                      <view class="elc-wrap-item-cost">
                        <text>{{ thousandSeparation(ite.cost) }}</text>
                      </view>
                    </view>
                  </template>
                  <view>
                    <view v-for="(it, i) in ite.children" :key="i">
                      <view class="elc-wrap-item child">
                        <text></text>
                        <view class="elc-wrap-item-name">
                          <text>{{ it.name }}</text>
                        </view>
                        <view class="elc-wrap-item-consumption">
                          <text>{{ thousandSeparation(it.consumption) }}</text>
                        </view>
                        <view class="elc-wrap-item-cost">
                          <text>{{ thousandSeparation(it.cost) }}</text>
                        </view>
                      </view>
                    </view>
                  </view>
                </uni-collapse-item>
              </uni-collapse>
            </view>
          </view>
        </uni-collapse-item>
        <view class="elc-btn">
          <text>查看详情</text>
        </view>
      </uni-collapse>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import elcService from './ecs-list-card.service';
import { thousandSeparation } from '@/utils';

const collapse = ref();
</script>
<style lang="scss" scoped>
.elc-list-card {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  .elc-btn {
    height: 44px;
    font-size: 14px;
    border-radius: 8px;
    background-color: var(--tem-bg-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--tem-color-primary);
  }

  .elc-coolapse-header {
    // height: 80px;
    padding: 15px 0 15px 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &-title {
      height: 24px;
      display: flex;
      align-items: center;
      color: var(--tem-text-color-regular);
      font-size: var(--tem-font-size-b16);
      text {
        white-space: nowrap;
      }
      text:nth-child(1) {
        flex: auto;
        width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      text:nth-child(2) {
        display: inline-flex;
        align-items: center;
        height: 20px;
        width: 24px;
        flex: none;
        font-size: 12px;
        color: var(--tem-text-color-secondary);
      }
    }
    &-des {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px;
      > text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      > text:nth-child(1) {
        color: var(--tem-color-warning);
        font-size: var(--tem-font-size-b14);
        font-weight: 600;
      }
      > text:nth-child(2) {
        color: var(--tem-text-color-secondary);
        font-size: var(--tem-font-size-s12);
      }
    }
  }

  .elc-content {
    width: 100%;
    padding: 0 16rpx;
    &-header {
      width: 100%;
      height: 72rpx;
      display: flex;
      align-items: center;
      border-bottom: 2rpx solid var(--tem-border-color-light);
      text {
        font-size: var(--tem-font-size-s12);
        color: var(--tem-text-color-secondary);
        line-height: 40rpx;
      }
      text:nth-child(1) {
        width: 72rpx;
        flex: none;
      }
      text:nth-child(2) {
        width: 232rpx;
        flex: none;
      }
      text:nth-child(3) {
        text-align: right;
        flex: auto;
      }
      text:nth-child(4) {
        text-align: right;
        width: 160rpx;
        flex: none;
      }
    }
  }

  .elc-wrap-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    width: 100%;
    color: var(--tem-text-color-regular);
    font-size: var(--tem-font-size-b14);
    > text {
      display: flex;
      width: 72rpx;
      flex: none;
    }
    &-name {
      width: 232rpx;
      padding: 8rpx 0;
      flex: none;
    }
    &-consumption {
      flex: auto;
      text-align: right;
    }
    &-cost {
      width: 160rpx;
      flex: none;
      text-align: right;
      padding-right: 16rpx;
    }
    &.child {
      border-bottom: 2rpx solid var(--tem-border-color-light);
      background-color: #fafafa;
      .elc-wrap-item-name {
        padding-left: 16rpx;
      }
    }
  }

  :deep(.elc-container-collapse.uni-collapse) {
    border-radius: 8px;
  }
  :deep(.elc-container-collapse .uni-collapse-item__title-wrap) {
    width: 0;
  }

  :deep(.is-open + .uni-collapse-item__wrap) {
    height: auto !important;
  }
  :deep(.elc-container-collapse .uni-collapse-item__title-arrow) {
    position: relative;
    top: -12px;
  }

  :deep(.elc-wrap-collapse) {
    .uni-collapse-item__title {
      display: flex;
      flex-direction: row-reverse;
    }
    .uni-collapse-item__title-arrow {
      position: relative;
      top: 0;
      margin-right: 0;
    }
    .uni-collapse-item__title-box {
      padding: 0;
    }
    .uni-collapse-item__title-arrow {
      width: 72rpx;
    }
    .uni-collapse-item__title {
      position: relative;
      border-bottom: 2rpx solid var(--tem-border-color-light) !important;
    }
    .no-children {
      .uni-collapse-item__title-arrow {
        // display: none;
        visibility: hidden;
      }
    }
  }

  // :deep(.uni-collapse-item__title.uni-collapse-item-border) {
  //   border-bottom: 2rpx solid var(--tem-border-color-light) !important;
  // }
}
</style>
