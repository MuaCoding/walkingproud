import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'main'
})
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const index = this.navParams.get("index");
    this.index = index || 0;
  }

}
