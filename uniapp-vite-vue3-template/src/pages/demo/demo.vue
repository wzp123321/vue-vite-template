<template>
  <view class="demo">
    <!-- 搜索框区域 -->
    <view class="search-container">
      <view class="search-box">
        <input
          type="text"
          v-model="searchKeyword"
          placeholder="请输入搜索内容"
          class="search-input"
          @input="handleSearch"
        />
      </view>
    </view>

    <!-- 表格区域 - 居中显示并自适应高度 -->
    <view class="table-wrapper">
      <view class="table-container" :style="{ height: tableHeight + 'px' }">
        <!-- 表格头部 -->
        <view class="table-header">
          <view class="header-cell fixed-column">姓名</view>
          <view class="header-scroll">
            <view class="header-cell">年龄</view>
            <view class="header-cell">性别</view>
            <view class="header-cell">职位</view>
            <view class="header-cell">部门</view>
            <view class="header-cell">入职日期</view>
            <view class="header-cell">薪资</view>
            <view class="header-cell">绩效</view>
          </view>
        </view>

        <!-- 表格内容 - 支持下拉刷新、溢出时在表格区域出现滚动条 -->
        <scroll-view
          class="table-body"
          scroll-y
          @scroll="handleScroll"
          @scrolltolower="handleScrollToLower"
          refresher-enabled="true"
          :refresher-triggered="refreshing"
          @refresherpulling="onRefresherPulling"
          @refresherrefresh="onRefresherRefresh"
          @refresherrestore="onRefresherRestore"
          @refresherabort="onRefresherAbort"
          :refresher-threshold="80"
          refresher-background="#f5f5f5"
          refresher-default-style="none"
        >
          <!-- 自定义下拉刷新内容 -->
          <template #refresher>
            <view class="custom-refresher">
              <view class="refresher-icon" :class="{ rotating: refreshing }">
                <text>↻</text>
              </view>
              <text class="refresher-text">{{ refresherText }}</text>
            </view>
          </template>

          <!-- 表格内容 -->
          <view class="content-wrapper" :style="{ transform: `translateY(${scrollTop}px)` }">
            <!-- 固定列 -->
            <view class="fixed-column-wrapper">
              <view v-for="(item, index) in tableData" :key="'fixed-' + index" class="row-cell fixed-column">
                {{ item.name }}
              </view>
            </view>

            <!-- 滚动列 -->
            <view class="scroll-column-wrapper" @scroll="handleHorizontalScroll" ref="scrollColumnRef">
              <view v-for="(item, index) in tableData" :key="'scroll-' + index" class="row">
                <view class="row-cell">{{ item.age }}</view>
                <view class="row-cell">{{ item.gender }}</view>
                <view class="row-cell">{{ item.position }}</view>
                <view class="row-cell">{{ item.department }}</view>
                <view class="row-cell">{{ item.entryDate }}</view>
                <view class="row-cell">{{ item.salary }}</view>
                <view class="row-cell">{{ item.performance }}</view>
              </view>
            </view>
          </view>
        </scroll-view>

        <!-- 加载状态 -->
        <view class="loading-footer" v-if="loading">
          <text>加载中...</text>
        </view>
        <view class="loading-footer" v-else-if="hasMore">
          <text>上拉加载更多</text>
        </view>
        <view class="loading-footer" v-else>
          <text>没有更多数据了</text>
        </view>
      </view>
    </view>

    <!-- 底部按钮区域 -->
    <view class="button-container">
      <button class="action-button primary" @click="handlePrimaryAction">主要操作</button>
      <button class="action-button secondary" @click="handleSecondaryAction">次要操作</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';

// 表格数据类型定义
interface TableItem {
  name: string;
  age: number;
  gender: string;
  position: string;
  department: string;
  entryDate: string;
  salary: string;
  performance: string;
}

// 表格数据
const tableData = ref<TableItem[]>([]);
// 搜索关键词
const searchKeyword = ref('');
// 滚动位置
const scrollTop = ref(0);
// 水平滚动位置
const scrollLeft = ref(0);
// 加载状态
const loading = ref(false);
// 是否还有更多数据
const hasMore = ref(true);
// 当前页码
const currentPage = ref(1);
// 每页数据量
const pageSize = ref(20);
// 滚动列引用
const scrollColumnRef = ref<HTMLElement>();
// 表格高度
const tableHeight = ref(600);

// 下拉刷新相关数据
const refreshing = ref(false);
const refresherText = ref('下拉刷新');

// 监听窗口大小变化，实现表格自适应高度
onMounted(() => {
  // 初始化表格高度
  updateTableHeight();

  // 监听窗口大小变化
  window.addEventListener('resize', updateTableHeight);

  // 加载初始数据
  loadData(currentPage.value);
});

// 更新表格高度
const updateTableHeight = () => {
  // 获取页面可用高度
  const windowHeight = window.innerHeight;
  // 搜索框高度约60px，底部按钮高度约80px，边距约40px
  const otherElementsHeight = 60 + 80 + 40;
  // 计算表格高度
  tableHeight.value = Math.max(400, windowHeight - otherElementsHeight);
};

// 生成模拟数据
const generateMockData = (page: number, size: number): TableItem[] => {
  const data: TableItem[] = [];
  const start = (page - 1) * size;

  for (let i = start; i < start + size; i++) {
    data.push({
      name: `员工${i + 1}`,
      age: 20 + Math.floor(Math.random() * 30),
      gender: Math.random() > 0.5 ? '男' : '女',
      position: ['前端开发', '后端开发', '产品经理', 'UI设计师', '测试工程师'][Math.floor(Math.random() * 5)],
      department: ['技术部', '产品部', '设计部', '测试部', '行政部'][Math.floor(Math.random() * 5)],
      entryDate: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(
        2,
        '0',
      )}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      salary: `${Math.floor(Math.random() * 20000) + 5000}`,
      performance: `${Math.floor(Math.random() * 5) + 1}星`,
    });
  }

  return data;
};

// 加载数据
const loadData = async (page: number) => {
  if (loading.value) return;

  loading.value = true;

  try {
    // 模拟API请求延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newData = generateMockData(page, pageSize.value);

    if (page === 1) {
      tableData.value = newData;
    } else {
      tableData.value = [...tableData.value, ...newData];
    }

    // 模拟数据总量限制，实际应根据API返回判断
    if (page >= 5) {
      hasMore.value = false;
    }
  } catch (error) {
    console.error('加载数据失败:', error);
  } finally {
    loading.value = false;
  }
};

// 处理搜索
const handleSearch = () => {
  // 重置页码
  currentPage.value = 1;
  hasMore.value = true;

  // 模拟搜索逻辑
  // 实际项目中，这里应该调用搜索API
  console.log('搜索关键词:', searchKeyword.value);

  // 延迟执行搜索，避免频繁请求
  clearTimeout(window.searchTimeout);
  window.searchTimeout = setTimeout(() => {
    loadData(currentPage.value);
  }, 300);
};

// 处理垂直滚动
const handleScroll = (e: any) => {
  // scrollTop.value = e.detail.scrollTop;
};

// 处理水平滚动
const handleHorizontalScroll = (e: any) => {
  scrollLeft.value = e.detail.scrollLeft;
};

// 处理滚动到底部
const handleScrollToLower = () => {
  if (!loading.value && hasMore.value) {
    currentPage.value++;
    console.log(12323);
    loadData(currentPage.value);
  }
};

// 处理主要操作按钮点击
const handlePrimaryAction = () => {
  console.log('执行主要操作');
  uni.showToast({
    title: '执行主要操作',
    icon: 'none',
  });
};

// 处理次要操作按钮点击
const handleSecondaryAction = () => {
  console.log('执行次要操作');
  uni.showToast({
    title: '执行次要操作',
    icon: 'none',
  });
};

// 下拉刷新处理方法
const onRefresherPulling = () => {
  // 下拉过程中，可以根据下拉距离改变文本或图标
  console.log('下拉中');
};

const onRefresherRefresh = async () => {
  // 刷新触发时执行
  refreshing.value = true;
  refresherText.value = '正在刷新...';

  try {
    // 重置页码并重新加载数据
    currentPage.value = 1;
    hasMore.value = true;
    await loadData(currentPage.value);
  } catch (error) {
    console.error('刷新数据失败:', error);
  } finally {
    // 延迟一点时间再收起刷新，让用户看到刷新过程
    setTimeout(() => {
      refreshing.value = false;
      refresherText.value = '下拉刷新';
    }, 500);
  }
};

const onRefresherRestore = () => {
  // 下拉刷新被恢复时（进入刷新状态之前）
  console.log('恢复下拉');
};

const onRefresherAbort = () => {
  // 下拉刷新被中止时（未进入刷新状态）
  console.log('中止下拉');
  refreshing.value = false;
  refresherText.value = '下拉刷新';
};
</script>

<style lang="scss" scoped>
.demo {
  width: 100%;
  height: 100%;
  padding: 20rpx;
  box-sizing: border-box;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 搜索框样式 */
.search-container {
  margin-bottom: 20rpx;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8rpx;
  padding: 0 20rpx;
  height: 80rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.search-icon {
  margin-right: 16rpx;
}

.search-input {
  flex: 1;
  height: 100%;
  font-size: 28rpx;
  color: #333;
}

/* 表格包装器 - 居中显示 */
.table-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20rpx;
}

/* 表格容器 - 固定宽度并居中 */
.table-container {
  width: 100%;
  max-width: 1200rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 表格头部 */
.table-header {
  display: flex;
  background-color: #f8f9fa;
  border-bottom: 1rpx solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-scroll {
  display: flex;
  flex: 1;
  overflow-x: hidden;
}

.header-cell {
  width: 200rpx;
  padding: 24rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  text-align: center;
  border-right: 1rpx solid #e9ecef;
  box-sizing: border-box;
}

.header-cell:last-child {
  border-right: none;
}

.fixed-column {
  position: sticky;
  left: 0;
  background-color: #f8f9fa;
  z-index: 5;
  min-width: 160rpx;
}

/* 表格内容 - 溢出时在表格区域出现滚动条 */
.table-body {
  flex: 1;
  overflow-y: auto;
  position: relative;
}

.content-wrapper {
  display: flex;
  min-height: 100%;
}

.fixed-column-wrapper {
  position: sticky;
  left: 0;
  z-index: 4;
}

.scroll-column-wrapper {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
}

.row {
  display: flex;
  border-bottom: 1rpx solid #e9ecef;
}

.row-cell {
  width: 200rpx;
  padding: 24rpx;
  font-size: 28rpx;
  color: #666;
  text-align: center;
  border-right: 1rpx solid #e9ecef;
  box-sizing: border-box;
}

.row-cell:last-child {
  border-right: none;
}

.row-cell.fixed-column {
  position: sticky;
  left: 0;
  background-color: #fff;
  z-index: 3;
  min-width: 160rpx;
}

/* 加载状态 */
.loading-footer {
  padding: 20rpx;
  text-align: center;
  font-size: 26rpx;
  color: #999;
  border-top: 1rpx solid #e9ecef;
}

/* 底部按钮区域 */
.button-container {
  display: flex;
  justify-content: center;
  gap: 30rpx;
  margin-top: 20rpx;
}

.action-button {
  padding: 0 40rpx;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
  border-radius: 8rpx;
}

.action-button.primary {
  background-color: #007aff;
  color: #fff;
}

.action-button.secondary {
  background-color: #f0f0f0;
  color: #333;
}

/* 隐藏滚动条但保留滚动功能 */
.table-body::-webkit-scrollbar,
.scroll-column-wrapper::-webkit-scrollbar {
  width: 6rpx;
  height: 6rpx;
}

.table-body::-webkit-scrollbar-track,
.scroll-column-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.table-body::-webkit-scrollbar-thumb,
.scroll-column-wrapper::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3rpx;
}

.table-body::-webkit-scrollbar-thumb:hover,
.scroll-column-wrapper::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 自定义下拉刷新样式 */
.custom-refresher {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20rpx 0;
}

.refresher-icon {
  width: 60rpx;
  height: 60rpx;
  margin-bottom: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #007aff;
  transition: transform 0.3s ease;
}

.refresher-icon.rotating {
  animation: rotate 1s linear infinite;
}

.refresher-text {
  font-size: 26rpx;
  color: #666;
}

/* 旋转动画 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
