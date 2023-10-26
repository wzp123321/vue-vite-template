<template>
	<uni-nav-bar
		class="common-navigation-bar"
		title="props.title"
		:border="props.border"
		:statusBar="props.statusBar"
		:backgroundColor="backgroundColor"
		:color="props.color"
		:fixed="props.fixed"
	>
		<template v-slot:left>
			<icon-left class="cnb-back" @click="goBack" />
		</template>
		<!-- 导航栏标题 -->
		<view class="cnb-title" slot="default">
			<view v-if="!$slots.middle" :style="{ color: props.color }">
				{{ props.title }}
			</view>
			<!-- 插槽 -->
			<slot name="middle" v-else></slot>
		</view>
		<template v-slot:right>
			<slot name="right"></slot>
		</template>
	</uni-nav-bar>
</template>

<script lang="ts" setup>
// 组件
import { IconLeft } from '@arco-iconbox/vue-tem';
// 枚举
import { Common_EBridgeType } from '@/config/enum';
// 桥服务
import nativeBridge from '../../core/nativeBridge';
import { onLaunch } from '@dcloudio/uni-app';

const props = defineProps({
	// 是否调用原生方法
	nativeFlag: {
		type: Boolean,
		default: true,
	},
	// 标题
	title: {
		type: String,
		default: '',
	},
	// 是否有边框
	border: {
		type: Boolean,
		default: false,
	},
	// 是否包含状态栏
	statusBar: {
		type: Boolean,
		default: false,
	},
	// 自定义背景样式
	backgroundColor: {
		type: String,
		default: '',
	},
	// 字体颜色
	color: {
		type: String,
		default: 'var(--tem-text-color-primary)',
	},
	// 是否固定顶部
	fixed: {
		type: Boolean,
		default: true,
	},
});
/**
 * 返回
 */
const goBack = (): void => {
	if (props.nativeFlag) {
		nativeBridge.nativeCall(Common_EBridgeType.返回上一层, { pageHome: 1 }, () => {});
	} else {
		uni.navigateBack();
	}
};

onLaunch(() => {
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
