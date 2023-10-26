// 获取系统信息字段
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
