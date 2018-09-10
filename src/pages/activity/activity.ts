import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tab } from 'ionic-angular';

@IonicPage({
  name: 'activity',
  segment: 'activity/:id'
})
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  rootPage = "activity-index";

  id: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    const tab = this.navCtrl as Tab;
    const params = tab.rootParams || this.navParams.data;
    this.id = params.id;
  }

}
