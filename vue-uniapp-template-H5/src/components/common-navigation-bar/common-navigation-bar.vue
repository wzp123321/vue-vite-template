<template>
	<view class="common-navigation-bar" :style="props.customStyle">
		<icon-left class="cnb-back" @click="goBack" />
		<!-- 导航栏标题 -->
		<view class="cnb-title" v-if="!$slots.navigator">
			{{ props.navigatorTitle }}
		</view>
		<!-- 插槽 -->
		<slot name="navigator" v-else></slot>
	</view>
</template>

<script lang="ts" setup>
// 组件
import { Common_EBridgeType } from '@/config/enum';
import { IconLeft } from '@arco-iconbox/vue-te';
import { onMounted } from 'vue';
// 桥服务
import nativeBridge from '../../core/nativeBridge';

const props = defineProps({
	// 是否调用原生方法
	nativeFlag: {
		type: Boolean,
		default: true,
	},
	// 标题
	navigatorTitle: {
		type: String,
		default: '',
	},
	// 自定义样式
	customStyle: {
		type: Object,
		default: {},
	},
});

const goBack = () => {
	if (props.nativeFlag) {
		nativeBridge.nativeCall(Common_EBridgeType.返回上一层, { pageHome: 1 }, () => {});
	}
};

onMounted(() => {
	// 物理键返回监听事件
	nativeBridge.registerHandler('goBack', () => {
		goBack();
	});
});
</script>

<style lang="less" scoped>
.common-navigation-bar {
	position: relative;
	width: 100%;
	height: 44px;

	display: flex;

	.cnb-back {
		position: absolute;
		width: 24px;
		height: 24px;
		top: 10px;
		left: 16px;
	}

	.cnb-title {
		width: 100%;
		text-align: center;
		padding: 9px 0;
		font-size: var(--tem-font-size-h18);
		color: var(--tem-text-color-primary);
		line-height: 26px;
	}
}
</style>
