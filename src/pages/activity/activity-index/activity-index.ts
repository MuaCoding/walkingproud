import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { Result } from '../../../models/webapi';
import { WxShare } from './../../../providers/wxjssdk/wxjssdk';
import { AuthenticationProvider } from './../../../providers/authentication/authentication';
import { UtilityProvider } from '../../../providers/utility/utility';

import { AsyncSubject } from 'rxjs/AsyncSubject';
import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'activity-index',
  segment: 'index'
})
@Component({
  selector: 'page-activity-index',
  templateUrl: 'activity-index.html',
})
export class ActivityIndexPage {

  activity: any;
  completed = false;

  wxShare = new AsyncSubject<WxShare>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public auth: AuthenticationProvider, public utility: UtilityProvider) {
  }

  ionViewWillEnter() {
    this.getActivity();
  }

  getActivity() {
    const id = (this.navCtrl as Nav).rootParams["id"];
    if (!id) {
      this.completed = true;
      return false;
    }

    const activity$ = this.http.get<Result>(`/activity/${id}/detail`);

    activity$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        const data = result.data;
        data.time = this.calcDiff(data.time);
        this.activity = data;

        this.initShare(this.activity);
      },
      (error) => { }
    );
  }

  initShare(activity) {
    const userInfo$ = this.auth.getUserInfo();

    userInfo$.subscribe(
      (info) => {
        const shareaParams = {
          activity: activity.name,
          description: activity.description,
          province: activity.province,
          city: activity.city,
          district: activity.district,
          name: info.nick_name
        };

        const title = this.utility.eval(activity.share.index_title, shareaParams);
        const desc = this.utility.eval(activity.share.index_desc, shareaParams);
        const imgUrl = new URL(activity.ui.cover, location.origin).toString();

        this.wxShare.next({ title, desc, imgUrl });
        this.wxShare.complete();
      },
      (error) => {
        this.wxShare.error(error);
      }
    );
  }

  calcDiff(times) {
    let days = {};
    for (const pair in times) {
      const time = times[pair]
      days[pair] = this.diffDays(time);
    }
    times["day"] = days;

    return times;
  }

  diffDays(value) {
    const datePipe = new DatePipe("en-US");

    const now = new Date();
    const date = new Date(datePipe.transform(value, 'short'));

    const timespan = date.getTime() - now.getTime();

    return (timespan / (1000 * 3600 * 24));
  }

  donation(activity) {
    if (activity.time.day.donation_begin > 0) {
      this.utility.alert("筹款未开始", activity.tip.donation_begin);
      return false;
    }
    if (!(activity.time.day.donation_end > 0)) {
      this.utility.alert("筹款已截止", activity.tip.donation_end);
      return false;
    }

    this.navCtrl.push("team-list");
  }

  registration(activity) {
    if (activity.participant) {
      if (activity.participant.team) {
        this.navCtrl.push("team-item", { id: activity.participant.team });
      }
      else {
        if (!(activity.time.day.activity_end > 0)) {
          this.utility.alert("活动已结束", activity.tip.activity_end);
          return false;
        }
        if (!(activity.time.day.activity_begin > 0)) {
          this.utility.alert("活动已开始", activity.tip.activity_begin);
          return false;
        }

        this.navCtrl.push("team-list");
      }
    }
    else {
      if (activity.time.day.signup_begin > 0) {
        this.utility.alert("报名未开始", activity.tip.signup_begin);
        return false;
      }
      if (!(activity.time.day.signup_end > 0)) {
        this.utility.alert("报名已截止", activity.tip.signup_end);
        return false;
      }

      this.navCtrl.push("activity-protocol");
    }
  }

  gotoMain(index?: number) {
    this.utility.gotoPlatform(index);
  }

}
