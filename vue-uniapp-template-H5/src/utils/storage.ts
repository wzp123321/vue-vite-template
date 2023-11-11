/**
 * 调用公共方法设置本地缓存数据
 * @param key
 * @param value
 */
export const FSetStorageData = (key: string, value?: string): void => {
  uni.setStorageSync(key, value);
};
/**
 * 调用公共方法获取本地缓存数据
 * @param key
 * @returns
 */
export const FGetStorageData = (key: string): string | undefined => {
  return uni.getStorageSync(key);
};
/**
 * 批量删除缓存
 * @param keys
 */
export const FBatchRemoveStorageData = (keys?: string): void => {
  keys.forEach((key) => {
    uni.removeStorageSync(key);
  });
};
