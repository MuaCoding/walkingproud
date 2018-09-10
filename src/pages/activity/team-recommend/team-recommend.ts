import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Content, Nav } from 'ionic-angular';

import { Result, List } from '../../../models/webapi';
import { UtilityProvider } from './../../../providers/utility/utility';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'team-recommend',
  segment: 'team/:id/recommend',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-team-recommend',
  templateUrl: 'team-recommend.html',
})
export class TeamRecommendPage {

  @ViewChild(Content) content: Content;

  id = this.navParams.get("id");

  recommend: any[];
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public utility: UtilityProvider) {
  }

  ionViewWillEnter() {
    this.getRecommend();
  }

  getRecommend() {
    const activity = (this.navCtrl as Nav).rootParams["id"];

    const params = new HttpParams().set("activity", activity);
    const recommend$ = this.http.get<List>("/participant/recommend", { params });

    recommend$.finally(
      () => {
        this.completed = true;
        this.content.resize();
      }
    ).subscribe(
      (result) => {
        this.recommend = result.data;
      },
      (error) => { }
    );
  }

  doRefresh() {
    this.recommend = null;
    this.completed = false;
    this.getRecommend();
  }

  select(item) {
    const confirm$ = this.utility.confirm("", `确定要向“${item.name}”发送入队邀请吗？`, { icon: "ion-ios-wp-feedback-outline" });
    confirm$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          const loading$ = this.utility.loading();

          const activity = (this.navCtrl as Nav).rootParams["id"];
          const invite$ = this.http.post<Result>("/team/join/invite", { activity: activity, participant: item.id });

          invite$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              this.utility.alert("", "已成功发送邀请", { icon: "ion-ios-wp-success" });
            },
            (error) => { }
          );
        }
      }
    );
  }

}
