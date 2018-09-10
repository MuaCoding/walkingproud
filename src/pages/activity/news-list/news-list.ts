import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, InfiniteScroll, Refresher, Nav } from 'ionic-angular';

import { Paging } from '../../../models/webapi';
import { Pagination } from '../../../models/pagination';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'news-list',
  segment: 'news',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-news-list',
  templateUrl: 'news-list.html',
})
export class NewsListPage {

  result = new Pagination();

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getNews();
  }

  getNews(refresher?: Refresher | InfiniteScroll) {
    const id = (this.navCtrl as Nav).rootParams["id"];
    const params = new HttpParams().set("activity", id).set("page", this.result.current.toString());
    const news$ = this.http.get<Paging>(`/activity/news`, { params });

    news$.finally(
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
    this.getNews(refresher);
  }

  doInfinite(infiniteScroll) {
    this.result.reset();
    if (this.result.more) {
      this.getNews(infiniteScroll);
    }
  }

}
