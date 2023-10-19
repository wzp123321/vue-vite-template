<template>
	<view class="content">
		<common-navigation-bar navigatorTitle="测试页面"></common-navigation-bar>
		<button @click="handlePage">返回</button>
		<button @click="handleChartsPage">去看图表</button>
	</view>
</template>

<script setup lang="ts">
const handlePage = () => {
	uni.navigateBack();
};
const handleChartsPage = ()=>{
	uni.navigateTo({
		url:'/pages/charts/charts'
	})
}
</script>

<style></style>
