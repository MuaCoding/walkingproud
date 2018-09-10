import { Component, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';

import { Paging } from '../../../models/webapi';
import { Pagination } from '../../../models/pagination';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'user-donation-list',
  defaultHistory: ['usercenter']
})
@Component({
  selector: 'page-user-donation-list',
  templateUrl: 'user-donation-list.html',
})
export class UserDonationListPage {

  @Input() params: { [param: string]: string | string[]; };

  result = new Pagination();

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ngOnInit() {
    this.getDonation();
  }

  getDonation(refresher?: Refresher | InfiniteScroll) {
    const params = new HttpParams({ fromObject: this.params });
    const donation$ = this.http.get<Paging>("/user/pay", { params });

    donation$.finally(
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
    this.getDonation(refresher);
  }

  doInfinite(infiniteScroll) {
    if (this.result.more) {
      this.getDonation(infiniteScroll);
    }
  }

}
