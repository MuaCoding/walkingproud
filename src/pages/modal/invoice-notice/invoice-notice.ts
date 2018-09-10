import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Result } from '../../../models/webapi';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'modal-invoice-notice'
})
@Component({
  selector: 'page-invoice-notice',
  templateUrl: 'invoice-notice.html',
})
export class InvoiceNoticePage {

  invoiceNotice: any;
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getInvoiceNotice();
  }

  getInvoiceNotice() {
    const invoiceNotice$ = this.http.get<Result>("/article/invoice");

    invoiceNotice$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.invoiceNotice = result.data;
      },
      (error) => { }
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
