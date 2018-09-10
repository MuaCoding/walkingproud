/*
 * @Author: ETXIN
 * @Date: 2018-05-30 14:29:14
 * @Last Modified by: ETXIN
 * @Last Modified time: 2018-05-30 14:29:37
 */

interface Base<T> {
  /** 返回码 */
  code: number;
  /** 消息提示 */
  msg: string;
  /** 结果数据 */
  data: T;
}

/** 结果模型 */
export interface Result<T = any> extends Base<T> { }

/** 列表模型 */
export interface List<T = any> extends Base<T[]> { }

/** 分页模型 */
export interface Paging<T = any> extends Base<{
  /** 条数 */
  count: number;
  /** 页数 */
  page: number;
  /** 数据 */
  data: T[];
}> { }

export function isResult(val: any): val is Result {
  if (val) {
    let code = val.code;
    return code !== undefined || code !== null;
  }
  return false;
}

interface AreaBase {
  /** 名称 */
  name: string;
  /** 区划代码 */
  code: string;
}

/** 区县 */
export interface District extends AreaBase { }

/** 市 */
export interface City extends District {
  /** 区县 */
  districts?: Array<District>
}

/** 省 */
export interface Province extends District {
  /** 市 */
  cities?: Array<City>
}
