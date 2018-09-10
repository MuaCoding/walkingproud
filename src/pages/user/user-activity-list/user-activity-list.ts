import { Component, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';

import { Paging } from '../../../models/webapi';
import { Pagination } from '../../../models/pagination';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'user-activity-list',
  defaultHistory: ['usercenter']
})
@Component({
  selector: 'page-user-activity-list',
  templateUrl: 'user-activity-list.html',
})
export class UserActivityListPage {

  @Input() params: { [param: string]: string | string[] };

  result = new Pagination();

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ngOnInit() {
    this.getAcitivity();
  }

  getAcitivity(refresher?: Refresher | InfiniteScroll) {
    const params = new HttpParams({ fromObject: this.params }).set("page", this.result.current.toString());
    const activity$ = this.http.get<Paging>("/user/activity/list", { params });

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
    this.getAcitivity(refresher);
  }

  doInfinite(infiniteScroll) {
    if (this.result.more) {
      this.getAcitivity(infiniteScroll);
    }
  }

}
