/*
 * @Author: yut
 * @Date: 2023-11-03 14:39:22
 * @LastEditors: yut
 * @LastEditTime: 2023-11-06 14:45:10
 * @Descripttion:
 */
import type { Common_ICodeName } from '@/api/model';
import { ref } from 'vue';

class EcsDetailCardService {
  //标签列表
  private _tagList = ref<Common_ICodeName<string>[]>();
  public get tagList() {
    return this._tagList.value;
  }

  //当前选中的标签
  private _tagCode = ref('');
  public get tagCode() {
    return this._tagCode.value;
  }
  public set tagCode(val) {
    this._tagCode.value = val;
  }

  public getTagList = () => {
    this._tagList.value = [
      {
        code: '本院',
        name: '本院',
      },
      {
        code: '西院',
        name: '西院',
      },
      {
        code: '肿瘤中心',
        name: '肿瘤中心',
      },
      {
        code: '金银湖院区',
        name: '金银湖院区',
      },
      {
        code: 'XXXX院区',
        name: 'XXXX院区',
      },
      {
        code: '本院1',
        name: '本院',
      },
      {
        code: '西院1',
        name: '西院',
      },
      {
        code: '肿瘤中心1',
        name: '肿瘤中心',
      },
      {
        code: '金银湖院区1',
        name: '金银湖院区',
      },
      {
        code: 'XXXX院区1',
        name: 'XXXX院区',
      },
      {
        code: '本院12',
        name: '本院',
      },
      {
        code: '西院12',
        name: '西院',
      },
      {
        code: '肿瘤中心12',
        name: '肿瘤中心',
      },
      {
        code: '金银湖院区12',
        name: '金银湖院区',
      },
      {
        code: 'XXXX院区12',
        name: 'XXXX院区',
      },
      {
        code: '本院123',
        name: '本院',
      },
      {
        code: '西院123',
        name: '西院',
      },
      {
        code: '肿瘤中心123',
        name: '肿瘤中心',
      },
      {
        code: '金银湖院区123',
        name: '金银湖院区',
      },
      {
        code: 'XXXX院区123',
        name: 'XXXX院区',
      },
      {
        code: '本院1234',
        name: '本院',
      },
      {
        code: '西院1234',
        name: '西院',
      },
      {
        code: '肿瘤中心1234',
        name: '肿瘤中心',
      },
      {
        code: '金银湖院区1234',
        name: '金银湖院区',
      },
      {
        code: 'XXXX院区1234',
        name: 'XXXX院区',
      },
    ];
  };

  constructor() {
    this.getTagList();
  }
}

export default new EcsDetailCardService();
