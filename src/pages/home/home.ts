import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthenticationProvider } from './../../providers/authentication/authentication';

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthenticationProvider) {
  }

  ionViewWillEnter() {
    const info$ = this.auth.getUserInfo(true);
    info$.subscribe(
      (info) => {
        this.userInfo = info;
      },
      (error) => { }
    );
  }

}
