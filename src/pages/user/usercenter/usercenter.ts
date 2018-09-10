import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';

import { AuthenticationProvider } from './../../../providers/authentication/authentication';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'usercenter'
})
@Component({
  selector: 'page-usercenter',
  templateUrl: 'usercenter.html',
})
export class UsercenterPage {

  userInfo: any;
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthenticationProvider) {
  }

  ionViewWillEnter() {
    this.getUserInfo();
  }

  getUserInfo(refresher?: Refresher) {
    const userInfo$ = this.auth.getUserInfo(!!refresher);

    userInfo$.finally(
      () => {
        this.completed = true;

        setTimeout(() => {
          refresher && refresher.complete();
        }, 20);
      }
    ).subscribe(
      (info) => {
        this.userInfo = info;
      },
      (error) => { }
    )
  }

  doRefresh(refresher?) {
    this.getUserInfo(refresher);
  }

}
