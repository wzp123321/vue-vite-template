<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <common-navigation-bar navigatorTitle="测试页面"></common-navigation-bar>
    <view class="text-area">
      <button @click="handlePage">测试连续点击</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const date = ref<string>('2023-10-01');
const startDate = ref<string>('2023-10-01');
const endDate = ref<string>('2023-10-21');

const month = ref<string>('2023-01');
const startMonth = ref<string>('2023-01');
const endMonth = ref<string>('2023-10');

const year = ref<string>('2021');
const startYear = ref<string>('2020');
const endYear = ref<string>('2023');

const bindDateChange = (value: string) => {
  console.log(value);
};
const bindMonthChange = (value: string) => {
  console.log(value);
};
const bindYearChange = (value: string) => {
  console.log(value);
};
const handlePage = () => {
  uni.navigateTo({
    url: '/pages/energy-consumption-scan/energy-consumption-scan',
  });
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
