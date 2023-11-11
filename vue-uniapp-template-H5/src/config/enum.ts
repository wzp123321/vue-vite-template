// 公共请求地址
export enum Common_EPath {
  查询带总能耗的能源类型列表 = '/admin/energy/code/queryEnergyFlagOneIncludeTotalAsTree',
}

// 原生方法
export enum Common_EBridgeType {
  获取配置信息 = 'config',
  返回上一层 = 'goback',
}

// 能源类型
export enum Common_EEnergyCode {
  总能耗 = '00000',
  电 = '01000',
  水 = '02000',
  燃气 = '03000',
  蒸汽 = '20000',
}

// 颗粒度
export enum Common_ETimeUnit {
  日 = 'day',
  月 = 'month',
  年 = 'year',
}

// 网络状态
export enum Common_ENetworkType {
  'wifi网络' = 'wifi',
  '2g网络' = '2g',
  '3g网络' = '3g',
  '4g网络' = '4g',
  '5g网络' = '5g',
  '有线网络' = 'ethernet',
  'Android下不常见的网络类型' = 'unknown',
  无网络 = 'none',
}

// 树类型
export enum Common_ETreeType {
  区域 = '1',
  业态 = '2',
}

// 日期选择类型
export enum Common_EPickerType {
  年月日 = 'yyyy-MM-dd',
  年月 = 'yyyy-MM',
  年 = 'yyyy',
}

// 下拉刷新状态
export enum Common_ERefresherStatus {
  默认状态 = 0,
  松手立即刷新 = 1,
  刷新中 = 2,
  刷新成功 = 3,
}
