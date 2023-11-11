<template>
  <view :class="['ea-charts', landscapeFlag ? 'is-landscape' : '']">
    <view class="ec-box">
      <view class="ec-box-header">
        <text>能耗趋势</text>
        <icon-full-screen v-if="!props.landscapeFlag && !props.emptyFlag" @click="triggerLandscapeFlag(true)" />
        <icon-close v-if="props.landscapeFlag && !props.emptyFlag" @click="triggerLandscapeFlag(false)" />
      </view>
      <view class="ec-box-container" :style="mapChartSize()">
        <!-- :tooltipShow="false" :ontap="false" :onmouse="false"  -->
        <qiun-data-charts
          v-if="isShowRotate && !props.emptyFlag"
          type="mix"
          :opts="mapChartOptions()"
          :chartData="chartData"
          :tooltipShow="false"
          :ontap="true"
          :onmouse="false"
          @getIndex="getChartIndex"
        />
        <view class="ec-box-container-empty" v-if="props.emptyFlag">
          <text>暂无数据</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, type PropType } from 'vue';
import { useStore } from 'vuex';
// 配置
import { mapEnergyColorByCode } from '@/config/config';
// 组件
import { IconFullScreen, IconClose } from '@arco-iconbox/vue-tem';
import type { Ecs_IChartTouchEvent } from '@/pages/energy-consumption-scan/energy-consumption-scan.api';
import { Common_ETimeUnit } from '@/config/enum';
import { rpxToPx } from '@/utils';
import type { Ea_IChartVO } from '../energy-analysis.api';

// props
const props = defineProps({
  // 能源类型
  energyCode: {
    type: String,
    default: '00000',
  },
  // 是否横屏
  landscapeFlag: {
    type: Boolean,
    default: false,
  },
  // 时间颗粒度
  timeUnit: {
    type: String,
    default: '',
  },
  // 数据
  barDataList: {
    type: Object as PropType<Ea_IChartVO>,
    default: {},
  },
  // 空状态
  emptyFlag: {
    type: Boolean,
    default: false,
  },
});
// emits
const emits = defineEmits(['change', 'drill']);

// 数据
const chartData = ref<any>({});
// 单位
const unit = 'kwh';
// y轴配置
const yOption = {
  type: 'value',
  titleFontSize: 12,
  fontSize: 12,
  axisLine: false,
  fontColor: 'rgb(144, 146, 152)', // 字体颜色
  titleFontColor: 'rgb(144, 146, 152)', // 字体颜色
};
// 是否渲染
const isShowRotate = ref<boolean>(true);

/**
 * 图表配置
 */
const mapChartOptions = () => {
  return {
    color: [mapEnergyColorByCode(props.energyCode, 'rgb(14, 109, 250)'), 'rgb(134, 181, 252)', 'rgb(194, 234, 174)'],
    padding: [15, 6, 6, 12],
    enableScroll: false, // 禁用x滚轮
    dataLabel: false, // 隐藏数据点标签
    dataPointShape: true, // 是否显示数据点的图形标识
    dataPointShapeType: 'hollow',
    // 设备像素比，解决开启canvas2d后画布模糊的问题
    pixelRatio: 1,
    // 是否开启动画
    animation: false,
    // 横屏模式
    rotate: props.landscapeFlag,
    // 横屏锁定模式，如果开启横屏模式后，图表交互每次都会旋转90度，请赋值true
    rotateLock: props.landscapeFlag,
    legend: {
      // 图例
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 16,
      fontSize: 12, // 字体大小
      fontColor: 'rgb(48, 49, 51)', // 字体颜色
    },
    xAxis: {
      disableGrid: true,
      fontColor: 'rgb(144, 146, 152)',
      fontSize: 12,
    },
    yAxis: {
      gridType: 'dash',
      gridColor: 'rgb(220, 223, 230)',
      // 多y轴
      data: [
        {
          title: unit,
          position: 'left',
          titleOffsetX: -12,
          titleOffsetY: -8,
          ...yOption,
        },
        {
          title: '',
          position: 'right',
          unit: '%',
          ...yOption,
        },
      ],
    },
    // 额外配置
    extra: {
      // 折线图
      line: {
        type: 'straight',
      },
      // 柱状图
      column: {
        width: 7, // 柱子宽度
      },
    },
  };
};

// store
const store = useStore();
/**
 * 容器宽高
 */
const mapChartSize = () => {
  const { screenWidth, screenHeight } = store.getters.systemInfo;
  // 横屏时，
  const w = props.landscapeFlag
    ? screenWidth - rpxToPx('32') * 2 - rpxToPx('32') * 2 - rpxToPx('48')
    : screenWidth - rpxToPx('32') * 2;
  const h = props.landscapeFlag
    ? screenHeight - rpxToPx('88') - rpxToPx('16') * 2 - rpxToPx('24') * 2
    : screenHeight - rpxToPx('728') - rpxToPx('88') - rpxToPx('24') * 2 - rpxToPx('48');
  console.log('  width, height,', screenWidth, screenHeight, w, h);
  return {
    width: `${w}px`,
    height: `${h}px`,
  };
};

/**
 * 图表数据
 */
const getServerData = () => {
  //模拟从服务器获取数据时的延时
  setTimeout(() => {
    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    let res = {
      categories: props.barDataList.xAxis,
      series: props.barDataList.series?.map((item) => {
        const totalFlag = item?.type === '总能耗';
        return {
          index: totalFlag ? 0 : 1,
          type: totalFlag ? 'column' : 'line',
          name: item.type,
          data: item.data ?? [],
          addPoint: true,
        };
      }),
    };
    chartData.value = res;
  }, 500);
};
/**
 * 横屏
 */
const triggerLandscapeFlag = (value: boolean) => {
  emits('change', value);
  // 让图标重新渲染
  isShowRotate.value = false;
  setTimeout(() => {
    isShowRotate.value = true;
  });
};
/**
 * 获取点击的index
 * @param e
 */
const getChartIndex = (e: Ecs_IChartTouchEvent) => {
  if (props.timeUnit !== Common_ETimeUnit.日) {
    const index = e.currentIndex.index;
    emits('drill', index);
  }
};
/**
 * 初始化
 */
onLoad(() => {
  getServerData();
});
</script>
<style lang="scss" scoped>
.ea-charts {
  flex: auto;
  background-color: var(--tem-bg-color-page);

  .ec-box {
    width: 100%;
    height: 100%;
    padding: 24rpx 32rpx;
    box-shadow: 8rpx 0px 40rpx rgba(0, 0, 0, 0.03);
    background-color: var(--tem-color-white);
    border-radius: 16rpx 16rpx 0 0;
    display: flex;
    flex-direction: column;
    gap: 24rpx;

    .ec-box-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      > text {
        color: var(--tem-text-color-primary);
        font-size: 32rpx;
        line-height: 48rpx;
        font-weight: 600;
      }

      > svg {
        width: 48rpx;
        height: 48rpx;
        color: var(--tem-text-color-regular);
      }
    }

    .ec-box-container {
      flex: auto;
      overflow: hidden;

      .ec-box-container-empty {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        > text {
          font-size: var(--tem-font-size-b14);
          color: var(--tem-text-color-secondary);
        }
      }
    }
  }

  // 横屏
  &.is-landscape {
    padding: 16rpx 32rpx;

    .ec-box {
      flex-direction: row-reverse;

      .ec-box-header {
        flex-direction: column;
        width: 48rpx;

        > text {
          white-space: nowrap;
          transform: rotate(90deg) translateX(44rpx);
        }
      }

      .ec-box-container {
        flex: auto;
        height: 100%;
      }
    }
  }
}
</style>
