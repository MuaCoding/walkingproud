import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'user-donation',
  defaultHistory: ['usercenter']
})
@Component({
  selector: 'page-user-donation',
  templateUrl: 'user-donation.html',
})
export class UserDonationPage {

  index = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
