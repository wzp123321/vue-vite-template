import type { Ec_INodeItem } from '../energy-consumption.api';

/*
 * @Author: yut
 * @Date: 2023-11-04 10:52:13
 * @LastEditors: yut
 * @LastEditTime: 2023-12-27 15:32:25
 * @Descripttion:
 */
export interface ICard_DataItem extends Ec_INodeItem {
  loading: boolean;
  children: ICard_DataItem[];
}
