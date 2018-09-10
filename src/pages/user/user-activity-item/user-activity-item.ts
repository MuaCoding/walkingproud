import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Result } from './../../../models/webapi';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'user-activity-item',
  segment: 'user-activity/:id',
  defaultHistory: ['usercenter', 'user-activity-list']
})
@Component({
  selector: 'page-user-activity-item',
  templateUrl: 'user-activity-item.html',
})
export class UserActivityItemPage {

  id = this.navParams.get("id");

  info: any;
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewWillEnter() {
    this.getInfo();
  }

  getInfo() {
    const item$ = this.http.get<Result>(`/participant/${this.id}/info`);

    item$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.info = result.data;
      },
      (error) => { }
    );
  }

}
