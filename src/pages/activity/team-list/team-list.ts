import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Nav, Refresher, InfiniteScroll } from 'ionic-angular';

import { Paging, Result } from '../../../models/webapi';
import { Pagination } from '../../../models/pagination';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'team-list',
  segment: 'team',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-team-list',
  templateUrl: 'team-list.html',
})
export class TeamListPage {

  id = (this.navCtrl as Nav).rootParams["id"];

  init = false;
  keyword: string;

  result = new Pagination();
  participant: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getTeam();
  }

  ionViewWillEnter() {
    this.getParticipantStatus();
  }

  getTeam(refresher?: Refresher | InfiniteScroll) {
    const params = new HttpParams().set("activity", this.id).set("keyword", this.keyword || "").set("page", this.result.current.toString());
    const team$ = this.http.get<Paging>("/team", { params });

    team$.finally(
      () => {
        this.init = true;
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

  getParticipantStatus() {
    const params = new HttpParams().set("activity", this.id);
    const status$ = this.http.get<Result>("/participant/status", { params });

    status$.subscribe(
      (result) => {
        this.participant = result.data;
      },
      (error) => { }
    );
  }

  doRefresh(refresher?) {
    this.result.reset();
    this.getTeam(refresher);
  }

  doInfinite(infiniteScroll) {
    if (this.result.more) {
      this.getTeam(infiniteScroll);
    }
  }

}
