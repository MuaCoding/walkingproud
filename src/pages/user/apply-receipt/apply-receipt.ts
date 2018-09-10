import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Modal } from 'ionic-angular';

import { MultiPickerColumn } from 'ion-multi-picker';
import { Result, Province } from '../../../models/webapi';

import { CacheApiProvider } from '../../../providers/cache-api/cache-api';
import { UtilityProvider } from '../../../providers/utility/utility';
import { MultiPickerProvider } from '../../../providers/multi-picker/multi-picker';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'apply-receipt',
  segment: 'apply-receipt/:id',
  defaultHistory: ['usercenter']
})
@Component({
  selector: 'page-apply-receipt',
  templateUrl: 'apply-receipt.html',
})
export class ApplyReceiptPage {

  id = this.navParams.get("id");

  invoiceNotice: Modal;

  invoice: any;
  areaPicker: MultiPickerColumn[];
  completed = false;

  type = this.mutliPicker.fromatString("纸质发票", "电子发票");

  area: any;
  formData = {
    type: 1,
    title: null,
    area_code: null,
    area: null,
    address: null,
    addressee: null,
    phone: null,
    postcode: null,
    email: null,
    agree: false
  };

  phone_pattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public cacheApi: CacheApiProvider, public utility: UtilityProvider, public mutliPicker: MultiPickerProvider) {
  }

  ionViewDidLoad() {
    Observable.forkJoin([this.getInvoice(), this.getArea()]).finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => { },
      (error) => { }
    );
  }

  ionViewWillLeave() {
    this.utility.dismissModal(this.invoiceNotice);
  }

  getInvoice() {
    const params = new HttpParams().set("pay", this.id);
    const invoice$ = this.http.get<Result>("/invoice/info", { params }).shareReplay();

    invoice$.subscribe(
      (result) => {
        this.invoice = result.data;

        this.formData = result.data;
        if (!this.formData.type) {
          this.formData.type = 1;
        }
      },
      (error) => { }
    );

    return invoice$;
  }

  getArea() {
    const params = new HttpParams().set("notAuthorize", null);
    const area$ = this.cacheApi.get<Province>("/area", params).shareReplay();

    area$.subscribe(
      (result) => {
        this.areaPicker = this.mutliPicker.fromatArea(result.data);
      },
      (error) => { }
    );

    return area$;
  }

  areaChange(area) {
    let value = "";
    let text = "";

    for (const pair in area) {
      const element = area[pair];
      if (element.value) {
        value += `${element.value} `;
        text += `${element.text} `;
      }
    }

    this.formData.area_code = value.trim();
    this.formData.area = text.trim();
  }

  invoiceNoticeModal() {
    this.utility.dismissModal(this.invoiceNotice);
    this.invoiceNotice = this.utility.openModal("modal-invoice-notice", {}, { cssClass: 'small-modal' });
  }

  process(form: NgForm) {
    if (form.valid) {
      const formData = Object.assign({ pay: this.id }, this.formData);

      const confirm$ = this.utility.confirm("", "请仔细核对所填写的信息", { icon: "ion-ios-wp-prompt", okText: "提交" });
      confirm$.onDidDismiss(
        (data, role) => {
          if (role == "ok") {
            const loading$ = this.utility.loading();
            const apply$ = this.http.post<Result>("/invoice/apply", formData);

            apply$.finally(
              () => {
                loading$.dismiss();
              }
            ).subscribe(
              (result) => {
                this.navCtrl.push("apply-receipt-state");
              },
              (error) => { }
            );
          }
        }
      );
    }
    else {
      this.utility.toast("表单中有未通过验证项，请更正后重试");
    }
  }

}
