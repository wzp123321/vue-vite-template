<template>
  <view class="common-data-empty">
    <img src="../../assets/images/common/common-data-empty.png" />
    <text class="cde-message">暂无内容</text>
  </view>
</template>
<style lang="scss" scoped>
.common-data-empty {
  width: 100%;
  height: 100%;
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--tem-color-white);

  img {
    width: 320rpx;
    height: 320rpx;
  }

  .cde-message {
    display: block;
    color: var(--tem-text-color-regular);
    font-size: var(--tem-font-size-b16);
  }
}
</style>
