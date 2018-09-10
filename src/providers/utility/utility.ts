import { Injectable, isDevMode } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { App, DeepLinker, UrlSerializer, Nav, Tabs, Tab, Alert, AlertController, Toast, ToastController, Loading, LoadingController, Modal, ModalOptions, ModalController, ActionSheet, ActionSheetButton, ActionSheetController } from 'ionic-angular';
import { isBlank } from 'ionic-angular/util/util';
import { AuthenticationProvider } from './../authentication/authentication';
import * as QRCode from 'qrcode';

interface ConfirmOptions {
  cssClass?: string;
  okText?: string;
  cancelText?: string;
  icon?: string | boolean;
}

interface PromptOptions extends ConfirmOptions {
  input: { name, value?, placeholder?};
  handler?: any;
}

interface TipsOptions {
  status?: string;
  duration?: number;
  callback?: () => void;
}

@Injectable()
export class UtilityProvider {

  webapi: string = isDevMode() ? "http://192.168.1.11:288/" : "https://api.wp.upup.cn/";
  origin: string = isDevMode() ? "http://192.168.1.11:288/" : "https://m.wp.upup.cn/";
  pay: string = "https://pay.wp.upup.cn/";

  constructor(public app: App, public deepLinker: DeepLinker, public serializer: UrlSerializer, public sanitizer: DomSanitizer, public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, public auth: AuthenticationProvider) {
  }

  getRoot(idOrName: string = "app"): Tabs {
    return this.app.getNavByIdOrName(idOrName) as Tabs;
  }

  tabsSelect(tabs: Tabs, tab: Tab, resolve, reject) {
    tabs.select(tab).then(
      (result) => { resolve(result); },
      (reason) => { reject(reason); }
    );
  }

  /**
   * 前往主站
   * @param index 可选，切换至对应的Tab
   */
  gotoPlatform(index?) {
    return new Promise(
      (resolve, reject) => {
        const tabs = this.getRoot();
        const tab = tabs.getByIndex(0);
        tab.rootParams = { index };

        if (index >= 0 && tab._init) {
          const main = tab.getAllChildNavs().find((nav) => (nav.name === "main")) as Tabs;
          const defer$ = main.select(index);
          defer$.then(() => this.tabsSelect(tabs, tab, resolve, reject));
        }
        else {
          tab.root = "main";
          this.tabsSelect(tabs, tab, resolve, reject);
        }
      }
    );
  }

  /**
   * 前往活动站
   * @param id 站点id
   * @param page 可选，显示指定页面
   * @param params 可选，页面参数
   */
  gotoSubstation(id, page?, params?) {
    return new Promise(
      (resolve, reject) => {
        const tabs = this.getRoot();
        const tab = tabs.getByIndex(1);
        tab.rootParams = { id };

        if (page) {
          const configLink = this.serializer.getLinkFromName(page);
          const segment = this.serializer._createSegment(this.app, this.getRoot(), configLink, params);
          const initViews$ = this.deepLinker.initViews(segment);
          initViews$.then(
            (views) => {
              const defer$ = tab.setRoot("activity", { id });
              defer$.then(
                () => {
                  resolve();

                  const activity = tab.getAllChildNavs().find((nav) => (nav.name === "activity")) as Nav;
                  const defer2$ = activity.setPages(views);
                  defer2$.then(() => this.tabsSelect(tabs, tab, resolve, reject));
                }
              );
            }
          );
        }
        else {
          if (tab._init) {
            const defer$ = tab.setRoot("activity", { id });
            defer$.then(() => this.tabsSelect(tabs, tab, resolve, reject));
          }
          else {
            tab.root = "activity";
            this.tabsSelect(tabs, tab, resolve, reject);
          }
        }
      }
    );
  }

  /**
   * 前往收银台
   * @param order 订单编号
   * @param back 回调地址
   */
  gotoPay(order, back = location.href) {
    const openid = this.auth.openId;
    const a = document.createElement("a");
    a.href = new URL("/jsapi", this.pay).toString();
    a.search = `order=${order}&openid=${openid}&back=${encodeURIComponent(back)}`;

    location.replace(a.href);
  }

  background(value) {
    return value ? this.sanitizer.bypassSecurityTrustStyle(`url('${value}')`) : null;
  }

  alert(title, message, opts: ConfirmOptions = {}): Alert {
    const icon = opts.icon;

    const alert$ = this.alertCtrl.create({
      cssClass: (opts.cssClass || 'wp-alert') + (icon ? " icon" : ""),
      subTitle: icon ? `<i class="${icon}"></i>` : null,
      title: title,
      message: message,
      buttons: [{
        text: opts.okText || "确定",
        role: 'ok'
      }],
      dismissOnPageChange: true,
      enableBackdropDismiss: false
    });

    alert$.present();

    return alert$;
  }

  confirm(title, message, opts: ConfirmOptions = {}): Alert {
    const icon = opts.icon;

    const confirm$ = this.alertCtrl.create({
      cssClass: (opts.cssClass || 'wp-alert') + (icon ? " icon" : ""),
      subTitle: icon ? `<i class="${icon}"></i>` : null,
      title: title,
      message: message,
      buttons: [{
        text: opts.cancelText || "取消",
        role: 'cancel'
      }, {
        text: opts.okText || "确定",
        role: 'ok'
      }],
      dismissOnPageChange: true,
      enableBackdropDismiss: false
    });

    confirm$.present();

    return confirm$;
  }

  prompt(title, message, opts: PromptOptions = { input: { name: "default" } }): Alert {
    const icon = opts.icon;

    const prompt$ = this.alertCtrl.create({
      cssClass: (opts.cssClass || 'wp-alert') + (icon ? " icon" : ""),
      subTitle: icon ? `<i class="${icon}"></i>` : null,
      title: title,
      message: message,
      inputs: [{
        name: opts.input.name,
        value: opts.input.value,
        placeholder: opts.input.placeholder
      }],
      buttons: [{
        text: opts.cancelText || "取消",
        role: 'cancel'
      }, {
        text: opts.okText || "确定",
        role: 'ok',
        handler: opts.handler
      }],
      dismissOnPageChange: true,
      enableBackdropDismiss: false
    });

    prompt$.present();

    return prompt$;
  }

  qrcode(data, title = "二维码", subTitle?) {
    const loading$ = this.loading();

    QRCode.toDataURL(data, { margin: 0, width: 300 },
      (error, url) => {
        loading$.dismiss();

        if (error) {
          this.alert("二维码生成失败", error.message);
        }
        else {
          const alert$ = this.alertCtrl.create({
            cssClass: "wp-alert qrcode",
            title: title,
            subTitle: subTitle,
            message: `<img src="${url}">`,
            buttons: [{
              text: "关闭",
              role: 'ok'
            }],
            dismissOnPageChange: true,
            enableBackdropDismiss: false
          });
          alert$.present();
        }
      }
    );
  }

  toast(message, duration: number = 1500): Toast {
    const toast$ = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast$.present();

    return toast$;
  }

  loading(duration?: number): Loading {
    const loading$ = this.loadingCtrl.create({
      duration: duration,
      dismissOnPageChange: true
    });

    loading$.present();

    return loading$;
  }

  tips(message, opts: TipsOptions = {}): Loading {
    let status = opts.status || "complete";

    let icon = "ion-ios-wp-success";
    switch (status) {
      case "error": icon = "ion-ios-wp-delete"; break;
      case "info": icon = "ion-ios-wp-prompt"; break;
    }

    const tips$ = this.loadingCtrl.create({
      cssClass: status,
      spinner: 'hide',
      content: `<i class="${icon}"></i>
      <p>${message}</p>`,
      duration: opts.duration || 1500
    });

    tips$.present();

    tips$.onDidDismiss(
      (data, role) => {
        if (role == "backdrop") {
          opts.callback && opts.callback();
        }
      }
    );

    return tips$;
  }

  openModal(component: any, data?: any, opts: ModalOptions = {}) {
    const modal$ = this.modalCtrl.create(component, data, opts);

    let loading$: Loading;
    const timeout = setTimeout(() => {
      loading$ = this.loading();
    }, 20);

    this.deepLinker.getComponentFromName(component).then(
      (loadedComponent: any) => {
        clearTimeout(timeout);
        loading$ && loading$.dismiss();
      }
    );

    modal$.present();

    return modal$;
  }

  dismissModal(modal: Modal) {
    modal && modal.dismiss(null, null, { animate: false });
  }

  actionSheet(title, buttons: ActionSheetButton[] = []): ActionSheet {
    buttons.push({
      text: "取消",
      role: "cancel"
    });

    const actionSheet$ = this.actionSheetCtrl.create({
      title: title,
      buttons: buttons,
      dismissOnPageChange: true
    });

    actionSheet$.present();

    return actionSheet$;
  }

  /** 解析URL参数 */
  parseUrlParam(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(&|$)");
    var match = location.href.match(reg);
    if (match) return match[2];
    return null;
  }

  /** 替换表达式参数 */
  eval(expression: string, scope) {
    for (const pair in scope) {
      const param = scope[pair];
      expression = expression.replace(new RegExp(`{${pair}}`, "gim"), param);
    }
    return expression;
  }

  /** 格式化为Date */
  fomatDate(value: any): Date {
    try {
      if (isBlank(value)) {
        return null;
      }

      const datePipe = new DatePipe("en-US");
      return new Date(datePipe.transform(value, 'medium'));
    }
    catch (ex) {
      return null;
    }
  }

}
