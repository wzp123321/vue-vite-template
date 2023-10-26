// 对象
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

// CodeName对象
export interface Common_ICodeName<T = string> {
	code: T;
	name: string;
}

// KeyValue对象
export interface Common_IKeyValue<T = string> {
	key: T;
	value: string;
}

// ValueLabel对象
export interface Common_IValueLabel<T = string> {
	value: T;
	label: string;
}

// 能源类型
export interface Common_IEnergyVO {
	code: string;
	name: string;
	unit: string;
}
