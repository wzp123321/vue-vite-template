<template>
	<view class="charts-container">
		<button @click="handlePage">返回</button>
		<button @click="handleRotate">横屏</button>
		<view class="charts-box">
			<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			rotate: false,
			chartData: {},
			//您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
			opts: {
				color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
				padding: [15, 10, 0, 15],
				dataLabel: false,
				dataPointShape: false,
				enableScroll: false,
				legend: {},
				xAxis: {
					disableGrid: true,
				},
				yAxis: {
					gridType: 'dash',
					dashLength: 2,
					data: [
						{
							min: 0,
							max: 150,
						},
					],
				},
				extra: {
					line: {
						type: 'curve',
						width: 2,
						activeType: 'hollow',
						linearType: 'custom',
					},
				},
			},
		};
	},
	onReady() {
		this.getServerData();
	},
	methods: {
		handlePage() {
			uni.navigateBack();
		},
		handleRotate() {
			this.rotate = !this.rotate;
			this.getServerData();
		},
		getServerData() {
			//模拟从服务器获取数据时的延时
			setTimeout(() => {
				//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
				let res = {
					categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
					rotate: this.rotate,
					series: [
						{
							name: '成交量A',
							linearColor: [
								[0, '#1890FF'],
								[0.25, '#00B5FF'],
								[0.5, '#00D1ED'],
								[0.75, '#00E6BB'],
								[1, '#90F489'],
							],
							data: [15, 45, 15, 45, 15, 45],
						},
						{
							name: '成交量B',
							linearColor: [
								[0, '#91CB74'],
								[0.25, '#2BDCA8'],
								[0.5, '#2AE3A0'],
								[0.75, '#C4D06E'],
								[1, '#F2D375'],
							],
							data: [55, 85, 55, 85, 55, 85],
						},
						{
							name: '成交量C',
							linearColor: [
								[0, '#FAC858'],
								[0.33, '#FFC371'],
								[0.66, '#FFC2B2'],
								[1, '#FA7D8D'],
							],
							data: [95, 125, 95, 125, 95, 125],
						},
					],
				};
				console.log(res);
				this.chartData = JSON.parse(JSON.stringify(res));
			}, 500);
		},
	},
};
</script>

<style scoped>
	
.charts-container {
	width: 100%;
	height: 750px;
	display: flex;
	flex-direction: column;
}
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
	width: 100%;
	height: 300px;
}
</style>
