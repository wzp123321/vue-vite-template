/**
 * 对象
 */
export interface Common_IObject {
  [key: string]: string | number | boolean | Common_IObject;
}

/**
 * http请求
 */
export interface Common_IHttpResponseImpl<T> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}

/**
 * CodeName对象
 */
export interface Common_ICodeName<T = string> {
  code: T;
  name: string;
}

/**
 * KeyValue对象
 */
export interface Common_IKeyValue<T = string> {
  key: T;
  value: string;
}

/**
 * ValueLabel对象
 */
export interface Common_IValueLabel<T = string> {
  value: T;
  label: string;
}

/**
 * 系统信息
 */
export interface Common_ISystemVO {
  // 手机屏幕宽度
  screenWidth: number;
  // 手机屏幕高度
  screenHeight: number;
  // 系统
  platform: string;
}

/**
 * 能源类型
 */
export interface Common_IEnergyVO {
  code: string;
  name: string;
  unit: string;
}

/**
 * 树节点
 */
export interface Common_ITreeVO {
  treeId: number;
  treeName: string;
  parentId: number | null;
  parentName: string;
  children?: Common_ITreeVO[];
}
