<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
  <view>
    <view @click="test"> {{ value }}{{ years }}{{ months }}</view>

    <uni-popup ref="popupRef" type="bottom">
      <view class="cdp-popup">
        <view class="cdp-popup-header">
          <text class="cdp-popup-header-cancel">取消</text>
          <text class="cdp-popup-header-title">选择日期</text>
          <text class="cdp-popup-header-submit">确定</text>
        </view>
        <picker-view :value="value" @change="bindChange" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const popupRef = ref();
const years = ref<any>([]);
const months = ref<any>([]);
const days = ref<any>([]);
const value = ref([9999, 3, 2]);

const date = new Date();
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.value.push(i);
}
for (let i = 1; i <= 12; i++) {
  months.value.push(i);
}
for (let i = 1; i <= 31; i++) {
  days.value.push(i);
}

function bindChange(e: any) {
  console.log(e);
}

function test() {
  popupRef.value.open();
}
</script>

<style>
.picker-view {
  width: 750rpx;
  height: 600rpx;
  margin-top: 20rpx;
}
.item {
  line-height: 100rpx;
  text-align: center;
}
</style>
