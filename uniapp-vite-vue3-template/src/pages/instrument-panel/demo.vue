<template>
  <image src="./1721541245898.png"></image>
  <image src="./111.png"></image>
  <view class="lc-temperature-control-chart">
    <!-- 中间值 -->
    <view class="ltcc-middle">22℃</view>
    <view class="ltcc-dash-board">
      <view class="ltcc-dash-board-container">
        <view
          :class="[
            'ltcc-dash-board-container-item',
            item < active - 10 ? 'is-active' : '',
            item > max ? 'is-hidden' : '',
          ]"
          v-for="item in count"
        ></view>
      </view>
      <!-- 当前值 -->
      <view class="ltcc-dash-board-current">
        <view
          class="ltcc-dash-board-current-pointer"
          :style="{ transform: `rotate(${(active - 18) * 11.25}deg)` }"
        ></view>
        <text>{{ active }}℃</text>
      </view>
      <!-- 最小值 -->
      <text class="ltcc-dash-board-min">14℃</text>
      <!-- 最大值 -->
      <text class="ltcc-dash-board-max">30℃</text>
    </view>
    <!-- 按钮 -->
    <view class="ltcc-footer">
      <view class="ltcc-footer-btn" @click="handleMinus()">-</view>
      <view class="ltcc-footer-btn" @click="handleAdd()">+</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(32);
// 最大显示
const max = 21;
const active = ref(16);

const handleMinus = () => {
  if (active.value > 14) {
    active.value -= 1;
  }
};

const handleAdd = () => {
  if (active.value < 28) {
    active.value += 1;
  }
};
</script>

<style lang="scss" scoped>
.lc-temperature-control-chart {
  position: relative;
  width: 686rpx;
  height: 640rpx;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  flex-shrink: 0;
  padding: 40rpx;
  border-radius: 16rpx;
  background: #f1f2f3;

  > .ltcc-middle {
    width: 100%;
    text-align: center;
    padding-left: 24rpx;
  }

  > .ltcc-dash-board {
    position: relative;
    height: 364rpx;
    width: 100%;

    > .ltcc-dash-board-container {
      position: relative;
      width: 364rpx;
      height: 100%;
      margin: 0 auto;

      .ltcc-dash-board-container-item {
        position: absolute;
        width: 3rpx;
        height: 16rpx;
        // background: #e9e9e9;
        background: #828282;
        left: 50%;
        top: 0;
        transform-origin: 0 182rpx;

        &.is-active {
          background: #0e6dfa;
        }

        &.is-hidden {
          display: none;
        }
      }

      @for $i from 1 through 32 {
        .ltcc-dash-board-container-item:nth-child(#{$i}) {
          // -8是旋转90度
          transform: rotate(#{($i - 1 - 10) * 11.25deg});
        }
      }
    }

    > .ltcc-dash-board-current {
      width: 360rpx;
      height: 360rpx;
      background-image: url(./111.png);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      position: absolute;
      top: 0rpx;
      left: 50%;
      transform: translateX(-50%);

      > text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        font-size: 40rpx;
        font-weight: bold;
      }

      > .ltcc-dash-board-current-pointer {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        background: #0e6dfa;

        position: absolute;
        left: 86rpx;
        top: 86rpx;
        transform-origin: 94rpx 94rpx;
      }
    }

    > .ltcc-dash-board-min {
      position: absolute;
      top: 50%;
      left: 50rpx;
      transform: translateY(-50%);
      color: #333;
    }

    > .ltcc-dash-board-max {
      position: absolute;
      top: 50%;
      right: 50rpx;
      transform: translateY(-50%);
      color: #333;
    }
  }

  > .ltcc-footer {
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80rpx;
    margin-top: -50rpx;

    > .ltcc-footer-btn {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      text-align: center;
      line-height: 60rpx;
      border: 2rpx solid #6e6e6e;
    }
  }
}
</style>
