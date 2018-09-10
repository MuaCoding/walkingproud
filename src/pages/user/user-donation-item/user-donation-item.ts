import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Content, Modal } from 'ionic-angular';

import { Result } from '../../../models/webapi';
import { UtilityProvider } from './../../../providers/utility/utility';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'user-donation-item',
  segment: 'user-donation/:id',
  defaultHistory: ['usercenter', 'user-donation-list']
})
@Component({
  selector: 'page-user-donation-item',
  templateUrl: 'user-donation-item.html',
})
export class UserDonationItemPage {

  @ViewChild(Content) content: Content;

  id = this.navParams.get("id");

  donation: any;
  completed = false;

  cretificate: Modal;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public utility: UtilityProvider) {
  }

  ionViewDidLoad() {
    this.getDonation();
  }

  getDonation() {
    const donation$ = this.http.get<Result>(`/user/pay/${this.id}`);

    donation$.finally(
      () => {
        this.completed = true;
        this.content.resize();
      }
    ).subscribe(
      (result) => {
        this.donation = result.data;
      },
      (error) => { }
    );
  }

  gotoActivity(id) {
    this.utility.gotoSubstation(id);
  }

  gotoTeam(activity, id) {
    this.utility.gotoSubstation(activity, "team-item", { id });
  }

  openCertificate(donation) {
    this.utility.dismissModal(this.cretificate);
    this.cretificate = this.utility.openModal("certificate", { id: donation.outer_id });
  }

  pay(donation) {
    if (donation.pay.way == 0) {
      this.utility.toast("正在开发中...");
    }
    else {
      this.utility.toast("此订单不支持重新支付");
    }
  }

  cancel() {
    this.utility.toast("正在开发中...");
  }

}
