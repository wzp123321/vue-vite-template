/*
 * @Author: yut
 * @Date: 2023-11-04 10:52:13
 * @LastEditors: yut
 * @LastEditTime: 2023-11-06 10:30:53
 * @Descripttion:
 */
export interface ICard_DataItem {
  name: string;
  consumption: number;
  cost: number;
  data: {
    name: string;
    consumption: number;
    cost: number;
    children: {
      name: string;
      consumption: number;
      cost: number;
    }[];
  }[];
}
