import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { App, Platform, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { UtilityProvider } from '../utility/utility';

import * as wx from 'weixin-js-sdk';

export interface WxShare {
  title?: string;
  link?: string;
  imgUrl?: string;
  desc?: string;
  success?(): void;
  cancel?(): void;
  params?: string;
}

@Injectable()
export class WxjssdkProvider {

  /** 是否已注入 */
  isInject = false;

  /** 是否IOS设备 */
  get isIOS() {
    return this.platform.is("ios");
  }

  /** 定时操作 */
  wxjssdk_handle: number;

  /** 初始地址 */
  initial_url: string;

  /** 注入地址 */
  get config_url() {
    if (this.isIOS) {
      return this.initial_url;
    }
    else {
      return location.href;
    }
  }

  constructor(public app: App, public platform: Platform, public http: HttpClient, public utility: UtilityProvider) {
  }

  /** 初始化 */
  init(url) {
    this.initial_url = url;
    this.onViewDidLoad();
  }

  /** 监听页面加载事件 */
  onViewDidLoad() {
    this.app.viewDidLoad.subscribe(
      (view: ViewController) => {
        if (!view.isOverlay) {
          if (this.wxjssdk_handle) {
            clearTimeout(this.wxjssdk_handle);
          }

          let config: Promise<boolean>;

          view.didEnter.subscribe(
            () => {
              this.wxjssdk_handle = window.setTimeout(() => {
                config = this.config();

                config && config.then(
                  () => {
                    const obser: Observable<WxShare> = view.instance && view.instance.wxShare ? view.instance.wxShare : Observable.of({});

                    obser.subscribe(
                      (shareData) => {
                        this.share(shareData);
                        this.showMenu();
                      },
                      (error) => { }
                    );
                  }
                ).catch(() => { });
              }, 200);
            }
          );

          view.willLeave.subscribe(
            () => {
              config && config.then(
                () => {
                  this.hideMenu();
                }
              ).catch(() => { });
            }
          );
        }
      }
    );
  }

  /** 注入权限验证配置信息 */
  config(): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        if (this.isInject && this.isIOS) {
          resolve(false);
        }
        else {
          const params = new HttpParams().set("url", this.config_url);
          const wxjssdk$ = this.http.get<any>("/other/wxjssdk", { params });

          wxjssdk$.subscribe(
            (result) => {
              result.jsApiList = ["hideMenuItems", "showMenuItems", "onMenuShareTimeline", "onMenuShareAppMessage"];

              wx.config(result);

              wx.ready(
                () => {
                  this.isInject = true;
                  resolve(true);
                }
              );

              wx.error(
                (res) => {
                  this.utility.toast(res.errMsg);
                  reject(false);
                }
              );
            },
            (error) => {
              reject(false);
            }
          );
        }
      }
    );

  }

  //自定义分享内容
  share(custom: WxShare = {}) {
    wx.ready(
      () => {
        const title = custom.title || "益动 · Walking Proud";
        const link = custom.link || (custom.params ? (`${location.href}?${custom.params}`) : null) || location.href || this.utility.origin;
        const imgUrl = custom.imgUrl || (new URL("../assets/icon/df-logo.jpg", this.utility.origin).toString());
        const desc = custom.desc || link;

        wx.onMenuShareTimeline({ title, link, imgUrl });
        wx.onMenuShareAppMessage({ title, link, imgUrl, desc });
      }
    );
  }

  //显示功能按钮
  showMenu(menus?: string[]) {
    wx.ready(
      () => {
        wx.showMenuItems({
          menuList: menus || ["menuItem:share:appMessage", "menuItem:share:timeline"]
        });
      }
    );
  }

  //隐藏功能按钮
  hideMenu(menus?: string[]) {
    wx.ready(
      () => {
        wx.hideMenuItems({
          menuList: menus || ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:copyUrl", "menuItem:openWithQQBrowser", "menuItem:openWithSafari"]
        });
      }
    );
  }

}
