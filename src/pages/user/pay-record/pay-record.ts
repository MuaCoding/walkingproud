import { Component, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';

import { Paging } from '../../../models/webapi';
import { Pagination } from '../../../models/pagination';

import { UtilityProvider } from './../../../providers/utility/utility';

import 'rxjs/add/operator/finally';


@IonicPage({
  name: 'pay-record',
  defaultHistory: ['usercenter']
})
@Component({
  selector: 'page-pay-record',
  templateUrl: 'pay-record.html',
})
export class PayRecordPage {

  @Input() params: { [param: string]: string | string[]; };

  result = new Pagination();

  mock: Paging = {
    code: 0,
    msg: "",
    data: {
      page: 1,
      count: 2,
      data: [{
        id: 1,
        status: 0,
        activity: {
          id: 1,
          name: "益动3861公益徒步团队赛"
        },
        money: 2900.00
      },
      {
        id: 2,
        status: 1,
        activity: {
          id: 2,
          name: "益动马拉松赛跑个人赛",
        },
        money: 2900.00
      },
      {
        id: 3,
        status: 0,
        activity: {
          id: 2,
          name: "益动马拉松赛跑个人赛",
        },
        money: 2900.00
      }]
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public utility: UtilityProvider) {
  }

  ionViewDidLoad() {
    this.getPayRecord();
  }

  getPayRecord(refresher?: Refresher | InfiniteScroll) {
    const params = new HttpParams().set("page", this.result.current.toString());
    const project$ = this.http.get<Paging>(JSON.stringify(this.mock), { params });

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
    this.getPayRecord(refresher);
  }

  doInfinite(infiniteScroll) {
    if (this.result.more) {
      this.getPayRecord(infiniteScroll);
    }
  }
}
