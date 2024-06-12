/*
 * @Author: yut
 * @Date: 2023-10-26 10:04:15
 * @LastEditors: yut
 * @LastEditTime: 2023-10-31 12:43:44
 * @Descripttion:
 */
export enum QM_EDateType {
  本月 = '1',
  本年 = '2',
}

export enum QM_EAreaType {
  区域 = '1',
  业态 = '2',
}

export enum QM_ELevelType {
  一级 = '1',
  二级 = '2',
  三级 = '3',
}

/**
 * 状态对应的颜色
 */
export enum QM_EStatusColor {
  盈余 = 'rgb(82, 196, 26)',
  警告 = 'rgb(250, 140, 22)',
  超支 = 'rgb(245, 34, 45)',
}

/**
 * 状态
 */
export enum QM_EStatus {
  盈余 = '1',
  警告 = '2',
  超支 = '3',
}

export interface QM_IEnergyType {
  energyName: string;
  energyCode: string;
  parent: number;
  status: string;
}
