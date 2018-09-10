import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';

import { Paging } from '../../models/webapi';
import { Pagination } from '../../models/pagination';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'message',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  result = new Pagination();

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getMessage();
  }

  getMessage(refresher?: Refresher | InfiniteScroll) {
    const params = new HttpParams().set("page", this.result.current.toString());
    const message$ = this.http.get<Paging>("message", { params });

    message$.finally(
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
    )
  }

  doRefresh(refresher?) {
    this.result.reset();
    this.getMessage(refresher);
  }

  doInfinite(infiniteScroll) {
    if (this.result.more) {
      this.getMessage(infiniteScroll);
    }
  }

}
