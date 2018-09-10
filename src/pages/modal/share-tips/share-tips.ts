import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage({
  name: 'modal-share-tips'
})
@Component({
  selector: 'page-share-tips',
  templateUrl: 'share-tips.html',
})
export class ShareTipsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
