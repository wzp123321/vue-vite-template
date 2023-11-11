<template>
  <view class="common-network-error">
    <img src="../../assets/images/common/common-network-error.png" alt="bg" />
    <view class="cne-message">网络异常，请刷新重试</view>
    <view class="cne-description">请检查网络设置后刷新重试</view>
    <button type="button" class="cne-btn" @click="handlePageRefresh">刷新</button>
  </view>
</template>
<script lang="ts" setup>
// emits
const emits = defineEmits(['refresh']);
/**
 * 刷新
 */
const handlePageRefresh = () => {
  emits('refresh');
};
</script>
<style lang="scss" scoped>
.common-network-error {
  width: 100%;
  height: 100%;
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--tem-color-white);
  transition: all 233ms;

  img {
    width: 324rpx;
    height: 324rpx;
  }

  .cne-message {
    color: var(--tem-text-color-regular);
    font-size: var(--tem-font-size-b16);
  }

  .cne-description {
    margin-top: 8rpx;
    color: var(--tem-text-color-secondary);
    font-size: var(--tem-font-size-b14);
  }

  .cne-btn {
    background-color: var(--tem-color-primary);
    font-size: var(--tem-font-size-b16);
    color: var(--tem-color-white);
    border: none;
    width: 128rpx;
    height: 80rpx;
    margin-top: 48rpx;
  }
}
</style>
