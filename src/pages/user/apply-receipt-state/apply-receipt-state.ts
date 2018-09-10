import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'apply-receipt-state',
  defaultHistory: ['usercenter']
})
@Component({
  selector: 'page-apply-receipt-state',
  templateUrl: 'apply-receipt-state.html',
})
export class ApplyReceiptStatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
