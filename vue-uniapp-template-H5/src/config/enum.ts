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
  日 = '1d',
  月 = '1M',
  年 = '1y',
}
