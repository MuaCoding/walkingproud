/*
 * @Author: ETXIN
 * @Date: 2018-06-12 10:53:36
 * @Last Modified by: ETXIN
 * @Last Modified time: 2018-06-12 10:53:36
 */

import { Paging } from "./webapi";

export class Pagination {
  /** 当前页码 */
  current: number = 1;

  /** 总页数 */
  page: number = 1;

  /** 加载更多? */
  get more(): boolean {
    return (this.current > 0 && this.page > 1 && this.current <= this.page);
  };

  /** 第一页? */
  private get first(): boolean {
    return (this.current === 1);
  }

  /** 加载提示 */
  tips: string = "正在加载中...";

  /** 数据列表 */
  data: any[];

  /** 加载完成 */
  completed: boolean = false;

  /** 装载数据 */
  loading(result: Paging): any[] {
    let data = result.data;

    this.page = data.page;

    if (this.first) {
      this.data = data.data;
    }
    else {
      this.data = this.data.concat(data.data);
    }

    this.completed = true;

    this.current++;
    return this.data;
  }

  /** 重置/刷新 */
  reset(clear?: boolean) {
    this.current = 1;
    this.page = 1;
    if (!!clear) {
      this.data = null;
    }
  }
}
