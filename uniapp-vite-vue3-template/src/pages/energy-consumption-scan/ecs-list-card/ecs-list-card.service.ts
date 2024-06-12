/*
 * @Author: yut
 * @Date: 2023-11-04 10:39:58
 * @LastEditors: yut
 * @LastEditTime: 2023-11-06 10:30:21
 * @Descripttion:
 */
import { reactive, ref } from 'vue';
import type { ICard_DataItem } from './ecs-list-card.api';
const cardData = reactive([
  {
    name: '门诊楼1F',
    consumption: 999999999,
    cost: 999.99,
    data: [
      {
        name: '门诊楼1F',
        consumption: 999999999,
        cost: 999.99,
        children: [
          {
            name: '儿科',
            consumption: 999999999,
            cost: 999.99,
          },
          {
            name: '六个字换行',
            consumption: 999999999,
            cost: 999.99,
          },
          {
            name: '内分泌科',
            consumption: 999999999,
            cost: 999.99,
          },
          {
            name: '骨科',
            consumption: 999999999,
            cost: 999.99,
          },
        ],
      },
      {
        name: '门诊楼3F',
        consumption: 999999999,
        cost: 999.99,
        children: [
          {
            name: '门诊楼1F',
            consumption: 999999999,
            cost: 999.99,
          },
          {
            name: '门诊楼1F',
            consumption: 999999999,
            cost: 999.99,
          },
          {
            name: '门诊楼1F',
            consumption: 999999999,
            cost: 999.99,
          },
          {
            name: '门诊楼1F',
            consumption: 999999999,
            cost: 999.99,
          },
        ],
      },
      {
        name: '门诊楼5F',
        consumption: 999999999,
        cost: 999.99,
        children: [],
      },
    ],
  },
  {
    name: '门诊楼1F',
    consumption: 999999999,
    cost: 999.99,
    data: [
      {
        name: '门诊楼1F',
        consumption: 999999999,
        cost: 999.99,
        children: [
          {
            name: '儿科',
            consumption: 999999999,
            cost: 999.99,
          },
          {
            name: '六个字换行',
            consumption: 999999999,
            cost: 999.99,
          },
          {
            name: '内分泌科',
            consumption: 999999999,
            cost: 999.99,
          },
          {
            name: '骨科',
            consumption: 999999999,
            cost: 999.99,
          },
        ],
      },
      {
        name: '门诊楼3F',
        consumption: 999999999,
        cost: 999.99,
        children: [
          {
            name: '门诊楼1F',
            consumption: 999999999,
            cost: 999.99,
          },
          {
            name: '门诊楼1F',
            consumption: 999999999,
            cost: 999.99,
          },
          {
            name: '门诊楼1F',
            consumption: 999999999,
            cost: 999.99,
          },
          {
            name: '门诊楼1F',
            consumption: 999999999,
            cost: 999.99,
          },
        ],
      },
    ],
  },
]);
class EcsListCardService {
  private _cardData = ref<ICard_DataItem[]>([]);
  public get cardData() {
    return this._cardData.value;
  }

  private convert = () => {
    return cardData;
  };

  constructor() {
    this._cardData.value = this.convert();
  }
}
export default new EcsListCardService();
