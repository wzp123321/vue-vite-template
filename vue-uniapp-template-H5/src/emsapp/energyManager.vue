<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <common-navigation-bar navigatorTitle="测试页面"></common-navigation-bar>
    <view class="text-area">
      <button @click="handlePage">跳转能耗纵览</button>
    </view>
  </view>
</template>

<script setup lang="ts">

const handlePage = () => {
  uni.navigateTo({
    url: '/pages/energy-consumption-scan/energy-consumption-scan',
  });
};
</script>

