/*
 * @Author: yut
 * @Date: 2023-10-27 10:07:19
 * @LastEditors: yut
 * @LastEditTime: 2023-10-31 09:29:41
 * @Descripttion:
 */
import { ESA_EFieldType, ESA_EStatus } from './energy-saving-assessment.api';
import esaNormalBg from '../../assets/images/energy-saving-assessment/esa-normal-bg.png';
import esaWarningBg from '../../assets/images/energy-saving-assessment/esa-warn-bg.png';
import esaOverspentBg from '../../assets/images/energy-saving-assessment/esa-overspent-bg.png';

import esaNormalTagBg from '../../assets/images/energy-saving-assessment/esa-normal-tag.png';
import esaWarningTagBg from '../../assets/images/energy-saving-assessment/esa-warn-tag.png';
import esaOverspentTagBg from '../../assets/images/energy-saving-assessment/esa-overspent-tag.png';

import esaNormalHeaderBg from '../../assets/images/energy-saving-assessment/esa-normal-header.png';
import esaWarningHeaderBg from '../../assets/images/energy-saving-assessment/esa-warn-header.png';
import esaOverspentHeaderBg from '../../assets/images/energy-saving-assessment/esa-overspent-header.png';
import { ref } from 'vue';

class EnergySavingAssessmentService {
  private _detailList = ref<any[]>([]);
  public get detailList() {
    return this._detailList.value;
  }

  private _fieldType = ref(ESA_EFieldType.本月);
  public get fieldType() {
    return this._fieldType.value;
  }
  public set fieldType(val) {
    this._fieldType.value = val;
  }

  /**
   * 获取详情数据
   */
  getDetailData = () => {
    this._detailList.value = [
      {
        itemName: '本月定额总量',
        value: '321123321',
      },
      {
        itemName: '本月定额结余',
        value: '6,858.02',
      },
      {
        itemName: '节约成本(元)',
        value: '321123321',
      },
      {
        itemName: '节能量(kWh)',
        value: '321123321',
      },
    ];
  };

  /**
   * 根据状态获取对应的背景图
   * @param status
   * @returns
   */
  mapBackgroundImageByEnergyCode = (status: ESA_EStatus) => {
    let bgImage = esaNormalBg;
    let tabImage = esaNormalTagBg;
    let headImage = esaNormalTagBg;
    switch (status) {
      case ESA_EStatus.盈余:
        bgImage = esaNormalBg;
        tabImage = esaNormalTagBg;
        headImage = esaNormalHeaderBg;
        break;
      case ESA_EStatus.警告:
        bgImage = esaWarningBg;
        tabImage = esaWarningTagBg;
        headImage = esaWarningHeaderBg;
        break;
      case ESA_EStatus.超支:
        bgImage = esaOverspentBg;
        tabImage = esaOverspentTagBg;
        headImage = esaOverspentHeaderBg;
        break;
      default:
        bgImage = esaNormalBg;
        tabImage = esaNormalTagBg;
        headImage = esaNormalHeaderBg;

        break;
    }
    return {
      bgImage: `url(${bgImage})`,
      tabImage: `url(${tabImage})`,
      headImage: `url(${headImage})`,
    };
  };

  /**
   * 获取时间选择范围
   * @param type
   * @returns
   */
  getDate = (type?: string) => {
    const date = new Date();
    let year = date.getFullYear();
    let month: number | string = date.getMonth() + 1;

    if (type === 'start') {
      year = year - 60;
    } else if (type === 'end') {
      year = year + 2;
    }
    month = month > 9 ? month : '0' + month;
    return `${year}-${month}`;
  };
  private _date = ref(this.getDate());
  public get date() {
    return this._date.value;
  }
  public set date(val) {
    this._date.value = val;
  }
  constructor() {
    this.getDetailData();
  }
}

export default new EnergySavingAssessmentService();
