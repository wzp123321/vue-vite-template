<template>
  <view class="ecs-detail-card">
    <!-- 标签 -->
    <view :class="[tagStickyFlag ? 'is-fixed' : '', 'edc-tag']">
      <view>
        <text
          v-for="tag in edcService.tagList"
          @click="selectTag(tag.code)"
          :key="tag.code"
          :class="edcService.tagCode === tag.code ? 'edc-tag-active' : ''"
          >{{ tag.name }}</text
        >
        <view class="edc-more-icon" @click="showMoreTag"><icon-view-list /></view>
      </view>
    </view>
    <!-- 详细内容 -->
    <view class="edc-body">
      <view class="edc-body-container">
        <view class="edc-body-header">
          <text>总览</text>
          <view>
            <text>查看详情</text>
            <text><icon-right /></text>
          </view>
        </view>
        <view class="edc-body-content">
          <view class="edc-body-content-card">
            <view>
              <view><text>能耗值能耗值能耗值(kgce)</text></view>
              <view id="test"><text>3,679,317.893,679,317.89</text></view>
              <view>
                <text>同比</text>
                <text class="edc-body-content-success"><icon-bottom /></text>
                <text class="edc-body-content-success">-0.8%</text>
              </view>
              <view>
                <text>环比</text>
                <text class="edc-body-content-error"><icon-top /></text>
                <text class="edc-body-content-error">12%</text>
              </view>
            </view>
            <view>
              <view><text>成本(万元)</text></view>
              <view><text>235.89</text></view>
              <view>
                <text>同比</text>
                <text class="edc-body-content-success"><icon-bottom /></text>
                <text class="edc-body-content-success">-0.8%</text>
              </view>
              <view>
                <text>环比</text>
                <text class="edc-body-content-error"><icon-top /></text>
                <text class="edc-body-content-error">12%</text>
              </view>
            </view>
          </view>
          <view class="edc-body-content-chart">
            <view class="edc-body-content-chart-box">
              <qiun-data-charts type="ring" :opts="opts" :animation="animation" :chartData="chartData" />
            </view>
            <view class="edc-body-content-chart-legend">
              <view
                class="legend-item"
                v-for="(item, index) in legendData"
                :key="index"
                :class="[item.show ? '' : 'legend-item-hide']"
                @click="tapLegend(index)"
              >
                <view class="legend-item-tag" :style="mapLegendColor(index)"></view>
                <view class="legend-item-name">{{ item.name }}</view>
                <text class="legend-item-value">{{ item.value }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 弹出层 -->
    <!-- 普通弹窗 -->
    <uni-popup ref="popupRef" type="bottom">
      <view class="edc-popup">
        <view class="edc-popup-header">
          <text>选择节点</text>
          <icon-close class="edc-close" @click="closePopup" />
        </view>
        <view class="edc-popup-content">
          <view
            v-for="tag in edcService.tagList"
            :class="edcService.tagCode === tag.code ? 'edc-tag-active' : ''"
            :key="tag.code"
            @click="selectTag(tag.code)"
          >
            <text>{{ tag.name }}</text>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script lang="ts" setup>
import { IconRight, IconTop, IconBottom, IconClose, IconViewList } from '@arco-iconbox/vue-tem';
import { onLoad } from '@dcloudio/uni-app';
import { computed, onMounted, reactive, ref } from 'vue';
import edcService from './ecs-detail-card.service';

import { pxToRpx } from '@/utils';
const props = defineProps({
  // 是否吸顶
  tagStickyFlag: {
    type: Boolean,
    default: false,
  },
});

const stickyHeight = computed(() => {
  return pxToRpx('44') + 96 + 'rpx';
});

const popupRef = ref();

const color = reactive([
  '#0E6DFA',
  '#13C2C2',
  '#FAAD14',
  '#52C41A',
  '#1890FF',
  '#DB1ADB',
  '#FA8C16',
  '#A0D911',
  '#722ED1',
  '#EB2F96',
  '#F9DB15',
  '#FA541C',
]);

const mapLegendColor = (index: number) => {
  return {
    backgroundColor: color[index],
  };
};
const opts = reactive({
  color: color,
  padding: [0, 0, 0, 0],
  update: true,
  enableScroll: true,
  legend: {
    show: false,
  },
  subtitle: {},
  extra: {
    ring: {
      ringWidth: 32,
      customRadius: 70,
      activeOpacity: 0.5,
      activeRadius: 10,
      offsetAngle: 0,
      labelWidth: 15,
      border: true,
      borderWidth: 3,
      borderColor: '#FFFFFF',
    },
  },
});
const chartData = ref<any>();
const legendData = ref<any>();
const animation = ref<boolean>(false);
const getServerData = () => {
  //模拟从服务器获取数据时的延时
  setTimeout(() => {
    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    let res = {
      series: [
        {
          data: [
            { name: '门诊楼1F', value: 1, labelShow: false, show: true },
            { name: '门诊楼2F', value: 2, labelShow: false, show: true },
            { name: '门诊楼3F', value: 3, labelShow: false, show: true },
            { name: '门诊楼4F', value: 3, labelShow: false, show: true },
            { name: '门诊楼5F', value: 3, labelShow: false, show: true },
            { name: '门诊楼2F', value: 2, labelShow: false, show: true },
            { name: '门诊楼3F', value: 3, labelShow: false, show: true },
            { name: '门诊楼3F', value: 3, labelShow: false, show: true },
            { name: '门诊楼3F', value: 3, labelShow: false, show: true },
            { name: '门诊楼3F', value: 3, labelShow: false, show: true },
            { name: '门诊楼4F', value: 3, labelShow: false, show: true },
          ],
        },
      ],
    };
    chartData.value = JSON.parse(JSON.stringify(res));
    legendData.value = JSON.parse(JSON.stringify(res.series[0].data));
  }, 500);
};

const tapLegend = (index: number) => {
  //注意这里关闭了加载动画，不然点击图例会执行动画效果
  animation.value = false;
  legendData.value[index].show = !legendData.value[index].show;
  const data = {
    series: [
      {
        data: legendData.value,
      },
    ],
  };
  // 这里可以看出，只需要动态改变chartData.series.data.show（饼图类）chartData.series.show（其他图）即可动态改变图形显示与隐藏
  chartData.value = JSON.parse(JSON.stringify(data));
};

/**
 *选中标签
 */
const selectTag = (code: string) => {
  edcService.tagCode = code;
};

const emits = defineEmits(['scrollTop']);

//吸顶滚动距离
const scrollHeight = ref(0);
/**
 * 打开弹窗，滚动吸顶
 */
const showMoreTag = () => {
  popupRef.value?.open();
};

const closePopup = () => {
  popupRef.value?.close();
};

onLoad(() => {
  getServerData();
});

onMounted(() => {
  //获取吸顶需要滚动的距离
  const query = uni.createSelectorQuery().in(this);
  query
    .select('.edc-body')
    .boundingClientRect((data: any) => {
      scrollHeight.value = data.top;
    })
    .exec();
});
</script>
<style lang="scss" scoped>
.ecs-detail-card {
  width: 100%;
  padding-bottom: 32rpx;
  display: flex;
  flex-direction: column;
  // 头部标签栏
  .edc-tag {
    height: 96rpx;
    background-color: var(--tem-color-white);
    flex: none;
    overflow: scroll;
    display: flex;
    align-items: center;
    width: 100%;

    > view {
      padding: 0 32rpx;
      gap: 16rpx;
      display: flex;
      align-items: center;
    }
    text {
      display: flex;
      align-items: center;
      white-space: nowrap;
      padding: 0 32rpx;
      font-size: var(--tem-font-size-b14);
      border-radius: 64rpx;
      height: 64rpx;
      width: fit-content;
      background-color: var(--tem-fill-color);
    }
    &-active {
      background-color: var(--tem-color-primary-light-9) !important;
      color: var(--tem-color-primary) !important;
      font-weight: 600;
    }

    .edc-more-icon {
      position: absolute;
      width: 96rpx;
      height: 96rpx;
      font-size: 48rpx;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--tem-color-white);
    }
  }
  // 头部标签吸顶
  .is-fixed {
    position: fixed;
    left: 0;
    top: v-bind(stickyHeight);
    transition: none;
    z-index: 2;
    border-bottom: 2rpx solid var(--tem-border-color);
    .edc-more-icon {
      position: fixed;
    }
  }
  // 内容区域
  .edc-body {
    flex: auto;
    overflow: hidden;
    background: linear-gradient(180deg, #ffffff 0%, #f1f2f4 100%);
    &-container {
      height: 100%;
      margin: 0 32rpx;
      border-radius: 16rpx;
      background-color: var(--tem-color-white);
    }

    // 内容区域标题
    &-header {
      height: 104rpx;
      padding: 0 32rpx;
      gap: 20rpx;
      display: flex;
      align-items: center;
      > text {
        color: var(--tem-text-color-primary);
        font-size: 32rpx;
        font-weight: 600;
        flex: auto;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      > view {
        flex: none;
        display: flex;
        align-items: center;
        width: 144rpx;
        color: var(--tem-color-primary);
        font-size: 28rpx;
        > text:nth-child(2) {
          font-size: 32rpx;
          display: flex;
          height: 32rpx;
        }
      }
    }

    // 内容区域
    &-content {
      padding: 0 32rpx;
      // 内容区域卡片
      &-card {
        height: 220rpx;
        display: flex;
        gap: 24rpx;
        > view {
          flex: 1;
          width: 0;
          gap: 8rpx;
          padding: 16rpx 24rpx;
          border-radius: 8rpx;
          display: flex;
          flex-direction: column;
          background-color: var(--tem-fill-color);
          color: var(--tem-text-color-placeholder);
          view,
          text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          view:nth-child(1) {
            font-size: var(--tem-font-size-b14);
          }
          view:nth-child(2) {
            font-size: var(--tem-font-size-oh24);
            color: var(--tem-text-color-primary);
            font-family: D-DIN;
            font-weight: 600;
          }
          view:nth-child(3),
          view:nth-child(4) {
            font-size: 24rpx;
            display: flex;
            align-items: center;
            text:nth-child(1) {
              margin-right: 8rpx;
            }
          }
        }
      }
      &-success {
        color: var(--tem-color-success);
        display: inline-flex;
        align-items: center;
        font-size: 24rpx;
        :deep(span) {
          display: inline-flex;
          align-items: center;
        }
      }
      &-error {
        color: var(--tem-color-danger);
        display: inline-flex;
        align-items: center;
        font-size: 24rpx;
        :deep(span) {
          display: inline-flex;
          align-items: center;
        }
      }

      //环形图
      &-chart {
        min-height: 272rpx;
        max-height: 380rpx;
        padding: 32rpx 0;
        display: flex;
        gap: 50rpx;
        width: 100%;
        overflow: hidden;
        position: relative;
        &-box {
          flex: none;
          width: 300rpx;
        }
        // 图例
        &-legend {
          flex: auto;
          display: flex;
          flex-direction: column;
          gap: 8rpx;
          width: 0;
          overflow: scroll;
          .legend-item {
            display: flex;
            align-items: center;
            gap: 8rpx;

            &-tag {
              width: 20rpx;
              height: 20rpx;
              flex: none;
            }

            &-name {
              width: 212rpx;
              flex: none;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              font-size: var(--tem-font-size-b14);
              color: var(--tem-text-color-regular);
            }
            &-value {
              flex: auto;
              width: 0;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              color: var(--te-text-color-regular);
              font-family: D-DIN;
            }
            &-hide {
              .legend-item-tag {
                background-color: #aaaaaa !important;
              }
              .legend-item-name,
              .legend-item-value {
                color: #aaaaaa;
              }
            }
          }
        }
      }
    }
  }
  //弹窗
  .edc-popup {
    &-header {
      height: 116rpx;
      padding: 0 32rpx;
      border-radius: 24rpx 24rpx 0rpx 0rpxpx;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      background-color: var(--tem-bg-color);
      uni-text {
        padding: 32rpx 0;
        height: 52rpx;
        font-weight: 600;
        font-size: var(--tem-font-size-h18);
        display: inline-flex;
        align-items: center;
      }
      .edc-close {
        height: 48rpx;
        width: 48rpx;
        position: absolute;
        right: 32rpx;
      }
    }
    &-content {
      width: 100%;
      min-height: 424rpx;
      max-height: 576rpx;
      padding: 0 32rpx 32rpx;
      overflow: scroll;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(218rpx, 1fr));
      background-color: var(--tem-bg-color);
      gap: 16rpx;
      > view {
        height: 80rpx;
        border-radius: 80rpx;
        padding: 0 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--tem-fill-color);
        color: var(--tem-text-color-regular);
        font-size: var(--tem-font-size-b14);
        text {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
