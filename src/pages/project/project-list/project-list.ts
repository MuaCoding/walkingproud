import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';

import { Paging } from '../../../models/webapi';
import { Pagination } from '../../../models/pagination';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'project-list',
  segment: 'project'
})
@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html',
})
export class ProjectListPage {

  result = new Pagination();

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getProject();
  }

  getProject(refresher?: Refresher | InfiniteScroll) {
    const params = new HttpParams().set("page", this.result.current.toString());
    const project$ = this.http.get<Paging>("/project", { params });

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
    this.getProject(refresher);
  }

  doInfinite(infiniteScroll) {
    if (this.result.more) {
      this.getProject(infiniteScroll);
    }
  }

}
