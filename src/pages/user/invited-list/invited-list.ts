import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';

import { Paging } from '../../../models/webapi';
import { Pagination } from '../../../models/pagination';

import { UtilityProvider } from './../../../providers/utility/utility';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'invited-list',
  defaultHistory: ['usercenter']
})
@Component({
  selector: 'page-invited-list',
  templateUrl: 'invited-list.html',
})
export class InvitedListPage {

  result = new Pagination();

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public utility: UtilityProvider) {
  }

  ionViewDidLoad() {
    this.getInvited();
  }

  getInvited(refresher?: Refresher | InfiniteScroll) {
    const params = new HttpParams().set("page", this.result.current.toString());
    const project$ = this.http.get<Paging>("/team/join/invite", { params });

    project$.finally(
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
    this.getInvited(refresher);
  }

  doInfinite(infiniteScroll) {
    if (this.result.more) {
      this.getInvited(infiniteScroll);
    }
  }

}
