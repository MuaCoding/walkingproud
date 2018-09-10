import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { List } from '../../../models/webapi';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'activity-introduction',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-activity-introduction',
  templateUrl: 'activity-introduction.html',
})
export class ActivityIntroductionPage {

  index = 0;

  introduction: any[];
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getIntroduction();
  }

  getIntroduction() {
    const id = (this.navCtrl as Nav).rootParams["id"];
    const introduction$ = this.http.get<List>(`/activity/${id}/content`);

    introduction$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.introduction = result.data;
      },
      (error) => { }
    );
  }

  trackByFn(index: number, item) {
    return index;
  }

}
