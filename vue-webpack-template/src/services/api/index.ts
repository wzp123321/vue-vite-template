/*************************枚举start***********************************/

// 公共请求路径
export const Common_EPath = {};
/*************************枚举end***********************************/

/*************************类型start***********************************/
/**
 * http请求
 */
export interface Common_IHttpResponse<T> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}

// code、name
export interface Common_ICodeName<T = string> {
  code: T;
  name: string;
}

// id、name
export interface Common_IIdName<T = string> {
  id: T;
  name: string;
}

// label、value
export interface Common_ILabelValue<T = string> {
  value: T;
  label: string;
}

// 通用对象
export interface Common_IObject {
  [key: string]: any;
}
/*************************类型end***********************************/
