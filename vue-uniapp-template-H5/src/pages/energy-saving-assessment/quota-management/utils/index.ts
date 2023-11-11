/*
 * @Author: yut
 * @Date: 2023-10-31 12:29:27
 * @LastEditors: yut
 * @LastEditTime: 2023-10-31 12:34:12
 * @Descripttion:
 */
import { QM_EStatus, QM_EStatusColor } from '../quota-management.api';

/**
 * 根据状态显示对应的配色
 * @param status 状态
 */
export const mapStatusColor = (status: string) => {
  let color = '';
  switch (status) {
    case QM_EStatus.盈余:
      color = QM_EStatusColor.盈余;
      break;
    case QM_EStatus.警告:
      color = QM_EStatusColor.警告;
      break;
    case QM_EStatus.超支:
      color = QM_EStatusColor.超支;
      break;
    default:
      color = QM_EStatusColor.盈余;
      break;
  }
  return color;
};
