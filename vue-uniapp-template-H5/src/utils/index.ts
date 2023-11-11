import type { Common_IObject } from '@/api/model';

/**
 *
 * @returns 获取系统信息字段
 */
export const mapSystemInfo = () => {
  const sys = uni.getSystemInfoSync();
  console.log(sys);
  const { screenHeight, screenWidth, platform, navigationBarHeight, statusBarHeight } = sys;

  return { screenHeight, screenWidth, platform, navigationBarHeight, statusBarHeight };
};

/**
 * 处理数据千分位
 * @param state
 * @returns
 */
export const thousandSeparation = (value: number | null, returnType?: string) => {
  if (value || value === 0) {
    const str = typeof value === 'number' ? String(value) : value;
    let before = '';
    let after = '';
    if (str.includes('.')) {
      before = str.split('.')[0];
      after = str.split('.')[1];
    } else {
      before = str;
    }
    if (after || after === '0') {
      return before.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + after;
    } else {
      return before.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  } else {
    return returnType ? returnType : '-';
  }
};

/**
 * 获取地址参数项
 * @param key 参数名
 * @returns 参数名对应的值
 */
export const FGetQueryParam = (key: string): string | undefined => {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  const match = window.location.search.substring(1).match(reg) ?? '';
  if (match.length > 2) {
    return decodeURIComponent(match[2]);
  }
};

/**
 * 解决乘法导致精度丢失
 * @param arg1
 * @param arg2
 * @returns
 */
export const floatMultiply = (arg1: number, arg2: number) => {
  if (arg1 == null || arg2 == null) {
    return null;
  }
  let r1;
  let r2; // 小数位数
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  const n1 = Number(arg1.toString().replace('.', ''));
  const n2 = Number(arg2.toString().replace('.', ''));
  return (n1 * n2) / Math.pow(10, r1 + r2);
};

/**
 * 跳转页面
 * @param url
 * @param params
 */
export const handlePageTo = (url: string, params?: Common_IObject) => {
  if (params) {
    Object.entries(params).forEach(([k, v], index) => {
      url += (index === 0 ? '?' : '&') + `${k}=${v}`;
    });
  }
  uni.navigateTo({
    url,
  });
};

/**
 * rpx转px
 * @param rpx
 * @returns
 */
export const rpxToPx = (rpx: string) => {
  const screenWidth = uni.getSystemInfoSync().screenWidth;
  return (screenWidth * Number.parseInt(rpx)) / 750;
};

/**
 * px转rpx
 * @param px
 * @returns
 */
export const pxToRpx = (px: string) => {
  const screenWidth = uni.getSystemInfoSync().screenWidth;
  return (750 * Number.parseInt(px)) / screenWidth;
};

/**
 * 获取当前时间
 * @returns
 */
export const getCurrentDateStr = (): string => {
  const date = new Date();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  return `${date.getFullYear()}-${m > 9 ? m : '0' + m}-${d > 9 ? d : '0' + d}`;
};
