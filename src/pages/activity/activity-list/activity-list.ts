import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';

import { Paging } from '../../../models/webapi';
import { Pagination } from '../../../models/pagination';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'activity-list'
})
@Component({
  selector: 'page-activity-list',
  templateUrl: 'activity-list.html',
})
export class ActivityListPage {

  result = new Pagination();

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getActivity();
  }

  getActivity(refresher?: Refresher | InfiniteScroll) {
    const params = new HttpParams().set("page", this.result.current.toString());
    const activity$ = this.http.get<Paging>("/activity", { params });

    activity$.finally(
      () => {
        this.result.completed = true;

        setTimeout(() => {
          refresher && refresher.complete();
        }, 20);
      }
    ).subscribe(
      (result) => {
        this.result.loading(result);
      },
      (error) => {
        this.result.reset(true);
      }
    );
  }

  doRefresh(refresher?) {
    this.result.reset();
    this.getActivity(refresher);
  }

  doInfinite(infiniteScroll) {
    if (this.result.more) {
      this.getActivity(infiniteScroll);
    }
  }

}
